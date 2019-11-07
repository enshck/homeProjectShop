import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { setOrders, setOpenBasketModal } from "../../../store/actions";
import {
  IOrdersReducers,
  IIsOpenBasketModalReducers
} from "../../../utils/interfaces";
import firebase from "../../../utils/firebase";
import close from "../../../img/close.png";
import plus from "../../../img/plus.png";
import minus from "../../../img/minus.png";
import Spinner from "../../spinner";
import deleteIcon from "../../../img/delete.png";
import successIcon from "../../../img/successIcon.png";
import { getOrders } from "../../../utils/handlers";
import { GlobalStyleComponent } from "../../assets/assets";
import {
  ButtonSubmit,
  CloseButton,
  ControlButtons,
  ControlInput,
  CountContainer,
  DeleteIcon,
  GoodsContainer,
  InfoContainer,
  MainInfoContainer,
  MainModalContainer,
  ModalContainer,
  ModalContent,
  PriceContainer,
  ProductPicture,
  SingleGoodsContainer,
  SucessOrderContainer,
  SummaryOrder
} from "./components";

export interface IGoodsData {
  goodId: string;
  goodName: string;
  isSale: boolean;
  id?: string;
  parametrs: {
    color: string;
    internalMem: string;
    ram: string;
    sizeScreen: string;
    weight: string;
  };
  pictureUrl: string;
  price: string;
}

export interface IOrderElement {
  count: number;
  goodsData: IGoodsData;
}

export interface IProfile {
  email: string;
  displayName: string;
  uid: string;
  phoneNumber: string;
}

interface IProps {
  profile: IProfile;
}

const BasketModal = (props: IProps) => {
  const { profile } = props;
  const [summaryOrderPrice, setSummaryOrderPrice] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<boolean>(false);
  const dispatch = useDispatch();

  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );

  const isOpenBasketModal = useSelector<IIsOpenBasketModalReducers, boolean>(
    state => state.isOpenBasketModal
  );

  useEffect(() => {
    let sum: number = 0;
    orders.forEach(({ count, goodsData }: IOrderElement) => {
      sum = sum + +goodsData.price * count;
    });
    setSummaryOrderPrice(+sum.toFixed(2));
  }, [orders]);

  const updateOrderCountHandler = (newCount: number, order: IOrderElement) => {
    setFetching(true);
    if (newCount > 0 && newCount < 1000) {
      orders.forEach((elem, item) => {
        const { goodsData } = elem;
        if (goodsData.goodId === order.goodsData.goodId) {
          orders[item].count = +newCount;
        }
      });
      firebase
        .firestore()
        .collection("orders")
        .doc(profile.uid)
        .set({
          ordersData: orders
        })
        .then(result => {
          getOrders(
            profile.uid,
            orders => dispatch(setOrders(orders)),
            setFetching
          );
        })
        .catch(err => console.log(err));
    } else {
      getOrders(
        profile.uid,
        orders => dispatch(setOrders(orders)),
        setFetching
      );
    }
  };

  const deleteOrderHandler = (order: IOrderElement) => {
    setFetching(true);
    const newOrdersList = orders.filter(
      elem => elem.goodsData.goodId !== order.goodsData.goodId
    );
    firebase
      .firestore()
      .collection("orders")
      .doc(profile.uid)
      .set({
        ordersData: newOrdersList
      })
      .then(result => {
        getOrders(
          profile.uid,
          orders => dispatch(setOrders(orders)),
          setFetching
        );
      })
      .catch(err => console.log(err));
  };

  const submitHandlerOrder = async () => {
    const data = {
      orders,
      status: "ordered",
      date: moment().format("YYYY-MM-DD"),
      summaryOrder: summaryOrderPrice,
      userName: profile.displayName || profile.email || profile.phoneNumber
    };

    try {
      const response = await firebase
        .firestore()
        .collection("successOrders")
        .add(data);
      if (response.id) {
        await firebase
          .firestore()
          .collection("successOrders")
          .doc(response.id)
          .update({
            ...data,
            id: response.id
          });
        firebase
          .firestore()
          .collection("orders")
          .doc(profile.uid)
          .delete()
          .then(res => {
            dispatch(setOrders([]));
            setOrderStatus(true);
          });
      }
    } catch (err) {
      return;
    }
  };

  if (orderStatus) {
    return (
      <GlobalStyleComponent>
        <MainModalContainer isOpenModal={isOpenBasketModal}>
          <ModalContainer isOpenModal={isOpenBasketModal}>
            <CloseButton
              src={close}
              alt={"close"}
              onClick={() => {
                dispatch(setOpenBasketModal(false));
                setOrderStatus(false);
              }}
            />
            <ModalContent>
              <SucessOrderContainer>
                <h2>
                  Спасибо. Ваш заказ принят. Наши менеджеры скоро свяжутся с
                  вами
                </h2>
                <img src={successIcon} alt={"success"} />
              </SucessOrderContainer>
            </ModalContent>
          </ModalContainer>
        </MainModalContainer>
      </GlobalStyleComponent>
    );
  }

  return (
    <GlobalStyleComponent>
      <MainModalContainer isOpenModal={isOpenBasketModal}>
        <ModalContainer isOpenModal={isOpenBasketModal}>
          <CloseButton
            src={close}
            alt={"close"}
            onClick={() => dispatch(setOpenBasketModal(false))}
          />
          <ModalContent>
            {isFetching ? (
              <Spinner />
            ) : (
              <GoodsContainer>
                {orders.map(elem => {
                  const { count, goodsData } = elem;
                  const { goodId, goodName, pictureUrl, price } = goodsData;

                  return (
                    <SingleGoodsContainer key={goodId}>
                      <DeleteIcon
                        src={deleteIcon}
                        alt={"delete"}
                        onClick={() => deleteOrderHandler(elem)}
                      />
                      <MainInfoContainer>
                        <ProductPicture src={pictureUrl} alt={"pictureImg"} />
                        <InfoContainer>
                          <h2>{goodName}</h2>
                          <p>{price}$</p>
                        </InfoContainer>
                      </MainInfoContainer>
                      <CountContainer>
                        <ControlButtons
                          src={minus}
                          alt={"minus"}
                          onClick={() =>
                            updateOrderCountHandler(count - 1, elem)
                          }
                        />
                        <ControlInput
                          warning={count < 1 || count > 999}
                          defaultValue={count}
                          onBlur={e =>
                            updateOrderCountHandler(+e.target.value, elem)
                          }
                        />
                        <ControlButtons
                          src={plus}
                          alt={"plus"}
                          onClick={() =>
                            updateOrderCountHandler(count + 1, elem)
                          }
                        />
                      </CountContainer>
                      <PriceContainer>
                        <h3>{(+price * count).toFixed(2)} $</h3>
                      </PriceContainer>
                    </SingleGoodsContainer>
                  );
                })}
              </GoodsContainer>
            )}
            <SummaryOrder>
              <p>Вместе: {summaryOrderPrice}$</p>
              <ButtonSubmit onClick={submitHandlerOrder}>
                Оформить заказ
              </ButtonSubmit>
            </SummaryOrder>
          </ModalContent>
        </ModalContainer>
      </MainModalContainer>
    </GlobalStyleComponent>
  );
};

export default BasketModal;
