import React, { useState, Fragment } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

import close from "../../img/close.png";
import plus from "../../img/plus.png";
import minus from "../../img/minus.png";
import deleteIcon from "../../img/delete.png";
import firebase from "../../utils/firebase";
import { ISuccessOrders } from "../pages/adminPanel/ordersContainer";
import OrderStatusSelector from "../assets/OrderStatusSelector";
import { setAdminOrders } from "../../store/actions";
import Spinner from "../spinner";
import {
  getSuccessOrders,
  recalculationSummaryOrder
} from "../../utils/handlers";
import DynamicSearch from "../assets/DynamicSearch";
import { IGoodsData } from "./basketModal";

const MainModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 900;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  transition: 0.5s;
  & ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  & ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: grey;
  }

  ${({ isOpenModal }: { isOpenModal: boolean }) =>
    isOpenModal &&
    css`
      visibility: visible;
    `};
`;

const ModalContent = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  padding: 16px 24px 100px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 80%;
  height: 0;
  max-width: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  overflow: hidden;

  ${({ isOpenModal }: { isOpenModal: boolean }) =>
    isOpenModal &&
    css`
      height: 80vh;
    `};
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0px;
  right: 5px;
  cursor: pointer;
`;

const InfoContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  width: 100%;
`;

const ListElement = styled.li`
  display: flex;
  justify-content: center;
`;

const OrdersContainer = styled.div`
  overflow: auto;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding: 20px;
`;

const OrderElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  margin-top: 15px;
  padding: 15px;
  width: 60%;
  position: relative;
  img {
    max-width: 300px;
  }
  h3 {
    margin: 0;
  }
`;

const CodeOrderElement = styled.p`
  padding: 5px 10px;
  font-size: 14px;
  color: #999;
  background-color: #fef2b8;
  border-radius: 5px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
`;

const ControlButtons = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ControlInput = styled.input`
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  transition: border-color 0.3s linear;
  width: 68px;
  height: 28px;
  line-height: 28px;
  margin: 0 9px;
  padding: 5px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  font-size: 15px;
  resize: none;
  caret-color: #00a046;
  color: #4d4b4b;
  outline: none;
  ${({ warning }: { warning?: boolean }) =>
    warning &&
    css`
      border-color: red;
    `}
`;

const DeleteIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 10px;
  cursor: pointer;
`;

const ContolsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const OrderModal = ({
  setDetailOrderId,
  detailOrderId,
  adminOrders,
  isOpenModal,
  changedOrder
}: {
  setDetailOrderId: (detailOrderId: string | null) => void;
  detailOrderId: string | null;
  adminOrders: ISuccessOrders[];
  isOpenModal: boolean;
  changedOrder: ISuccessOrders;
}) => {
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
                      <CodeOrderElement>Код товара: {goodId}</CodeOrderElement>
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
  );
};

export default OrderModal;
