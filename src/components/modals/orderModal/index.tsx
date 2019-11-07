import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import close from "../../../img/close.png";
import plus from "../../../img/plus.png";
import minus from "../../../img/minus.png";
import deleteIcon from "../../../img/delete.png";
import firebase from "../../../utils/firebase";
import { ISuccessOrders } from "../../pages/adminPanel/ordersContainer";
import OrderStatusSelector from "../../assets/OrderStatusSelector";
import { setAdminOrders } from "../../../store/actions";
import Spinner from "../../spinner";
import {
  getSuccessOrders,
  recalculationSummaryOrder
} from "../../../utils/handlers";
import DynamicSearch from "../../assets/DynamicSearch";
import { IGoodsData } from "../basketModal";
import { GlobalStyleComponent } from "../../assets/assets";
import {
  ModalContent,
  ModalContainer,
  MainModalContainer,
  InfoContainer,
  DeleteIcon,
  CountContainer,
  ControlInput,
  ControlButtons,
  CloseButton,
  ListElement,
  CodeOrderElement,
  OrdersContainer,
  ContolsContainer,
  OrderElement
} from "./components";

interface IProps {
  setDetailOrderId: (detailOrderId: string | null) => void;
  isOpenModal: boolean;
  changedOrder: ISuccessOrders;
}

const OrderModal = (props: IProps) => {
  const { setDetailOrderId, isOpenModal, changedOrder } = props;
  const { date, orders, status, summaryOrder, userName, id } = changedOrder;
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onChangeStatus = async (value: string) => {
    await firebase
      .firestore()
      .collection("successOrders")
      .doc(id)
      .set({ ...changedOrder, ...{ status: value } });

    getSuccessOrders({
      handler: data => dispatch(setAdminOrders(data))
    });
    setOpen(false);
  };

  const updateOrderCountHandler = async (newCount: number, key: number) => {
    setFetching(true);
    if (newCount > 0 && newCount < 1000) {
      const { orders, id } = changedOrder;
      orders[key].count = +newCount;
      const newSummary = recalculationSummaryOrder({ changedOrder });

      await firebase
        .firestore()
        .collection("successOrders")
        .doc(id)
        .set({
          ...changedOrder,
          summaryOrder: newSummary
        });

      getSuccessOrders({
        handler: data => dispatch(setAdminOrders(data))
      });
    } else {
      getSuccessOrders({
        handler: data => dispatch(setAdminOrders(data))
      });
    }
    setFetching(false);
  };

  const deleteOrderHandler = async (key: number) => {
    setFetching(true);
    const changedOrderClone = { ...changedOrder };
    changedOrder.orders.splice(key, 1);
    const newSummary = recalculationSummaryOrder({ changedOrder });

    await firebase
      .firestore()
      .collection("successOrders")
      .doc(id)
      .set({
        ...changedOrderClone,
        summaryOrder: newSummary
      });

    getSuccessOrders({
      handler: data => dispatch(setAdminOrders(data))
    });
    setFetching(false);
  };

  const addGoodsInOrderHandler = async (product: IGoodsData) => {
    setFetching(true);
    const cloneChnagedOrder = { ...changedOrder };
    cloneChnagedOrder.orders.push({
      count: 1,
      goodsData: product
    });
    const newSummary = recalculationSummaryOrder({ changedOrder });

    await firebase
      .firestore()
      .collection("successOrders")
      .doc(id)
      .set({
        ...cloneChnagedOrder,
        summaryOrder: newSummary
      });

    getSuccessOrders({
      handler: data => dispatch(setAdminOrders(data))
    });
    setFetching(false);
  };

  return (
    <GlobalStyleComponent>
      <MainModalContainer isOpenModal={isOpenModal}>
        <ModalContainer isOpenModal={isOpenModal}>
          <CloseButton
            src={close}
            alt={"close"}
            onClick={() => setDetailOrderId(null)}
          />
          <ModalContent>
            {isFetching ? (
              <Spinner />
            ) : (
              <Fragment>
                <InfoContainer>
                  <ListElement>Заказчик: {userName}</ListElement>
                  <ListElement>Дата заказа: {date}</ListElement>
                  <ListElement>Сумма: {summaryOrder} $</ListElement>
                </InfoContainer>
                <ContolsContainer>
                  <OrderStatusSelector
                    status={status}
                    onSelect={onChangeStatus}
                    isOpen={isOpen}
                    setOpen={setOpen}
                  />
                  <DynamicSearch
                    onChangeHandler={addGoodsInOrderHandler}
                    orders={orders}
                  />
                </ContolsContainer>

                <OrdersContainer>
                  {orders.map((elem, key) => {
                    const { count, goodsData } = elem;
                    const { goodId, goodName, pictureUrl } = goodsData;

                    return (
                      <OrderElement key={goodId}>
                        <img src={pictureUrl} alt={"productImage"} />
                        <DeleteIcon
                          src={deleteIcon}
                          alt={"icon"}
                          onClick={() => deleteOrderHandler(key)}
                        />
                        <CodeOrderElement>
                          Код товара: {goodId}
                        </CodeOrderElement>
                        <h3>{goodName}</h3>
                        <CountContainer>
                          <ControlButtons
                            src={minus}
                            alt={"minus"}
                            onClick={() =>
                              updateOrderCountHandler(count - 1, key)
                            }
                          />
                          <ControlInput
                            warning={count < 1 || count > 999}
                            defaultValue={count}
                            onBlur={e =>
                              updateOrderCountHandler(+e.target.value, key)
                            }
                          />
                          <ControlButtons
                            src={plus}
                            alt={"plus"}
                            onClick={() =>
                              updateOrderCountHandler(count + 1, key)
                            }
                          />
                        </CountContainer>
                      </OrderElement>
                    );
                  })}
                </OrdersContainer>
              </Fragment>
            )}
          </ModalContent>
        </ModalContainer>
      </MainModalContainer>
    </GlobalStyleComponent>
  );
};

export default OrderModal;
