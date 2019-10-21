import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";

import { setOrders } from "../store/actions";
import firebase from "../utils/firebase";
import close from "../img/close.png";
import plus from "../img/plus.png";
import minus from "../img/minus.png";
import Spinner from "./spinner";
import deleteIcon from "../img/delete.png";
import successIcon from "../img/successIcon.png";
import { getOrders } from "../utils/handlers";

const MainModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 900;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
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
`;

const ModalContent = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  padding: 16px 24px 100px;
  overflow: auto;
`;

const CloseButton = styled.img`
  position: absolute;
  top: -50px;
  right: 5px;
  cursor: pointer;
`;

const GoodsContainer = styled.div``;

const SingleGoodsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
`;

const ProductPicture = styled.img`
  width: 150px;
  height: 150px;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80vh;
  max-width: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
`;

const InfoContainer = styled.div`
  h2 {
    color: #3e77aa;
    font-size: 14px;
    line-height: 19px;
  }
  p {
    border: 1px solid transparent;
    border-radius: 4px;
    vertical-align: middle;
    white-space: nowrap;
    background: #fef2b8;
    padding: 7px 7px 5px;
    font-size: 18px;
    line-height: 18px;
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
  ${props =>
    props.warning &&
    css`
      border-color: red;
    `}
`;

const SummaryOrder = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  background: #fef2b8;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 600;
  }
`;

const ButtonSubmit = styled.div`
  color: #fff;
  display: inline-block;
  position: relative;
  border: 0;
  outline: 0;
  height: 44px;
  background: #00a046 !important;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background: 0 0;
  cursor: pointer;
  z-index: 1;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
`;

const DeleteIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 5px;
  cursor: pointer;
`;

const MainInfoContainer = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h3 {
    font-size: 21px;
    line-height: 24px;
    font-weight: 400;
  }
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const SucessOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  h2 {
    font-weight: 400;
  }
`;

const BasketModal = props => {
  const { setOpenBasketModal, setOrders, orders, profile } = props;
  const [summaryOrderPrice, setSummaryOrderPrice] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);

  useEffect(() => {
    let sum = 0;
    orders.forEach(elem => {
      const { goodsData, count } = elem;
      sum = sum + goodsData.price * count;
    });
    setSummaryOrderPrice(sum.toFixed(2));
  }, [orders]);

  const updateOrderCountHandler = (newCount, order) => {
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
          getOrders(profile.uid, setOrders, setFetching);
        })
        .catch(err => console.log(err));
    } else {
      getOrders(profile.uid, setOrders, setFetching);
    }
  };

  const deleteOrderHandler = order => {
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
        getOrders(profile.uid, setOrders, setFetching);
      })
      .catch(err => console.log(err));
  };

  const submitHandlerOrder = () => {
    firebase
      .firestore()
      .collection("successOrders")
      .add({
        orders
      })
      .then(() => {
        firebase
          .firestore()
          .collection("orders")
          .doc(profile.uid)
          .delete()
          .then(() => {
            setOrders([]);
            setOrderStatus(true);
          })
          .catch(err => {});
      })
      .catch(err => {});
  };

  if (orderStatus) {
    return (
      <MainModalContainer>
        <ModalContainer>
          <CloseButton
            src={close}
            alt={"close"}
            onClick={() => setOpenBasketModal(false)}
          />
          <ModalContent>
            <SucessOrderContainer>
              <h2>
                Спасибо. Ваш заказ принят. Наши менеджеры скоро свяжутся с вами
              </h2>
              <img src={successIcon} alt={"success"} />
            </SucessOrderContainer>
          </ModalContent>
        </ModalContainer>
      </MainModalContainer>
    );
  }

  return (
    <MainModalContainer>
      <ModalContainer>
        <CloseButton
          src={close}
          alt={"close"}
          onClick={() => setOpenBasketModal(false)}
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
                        onClick={() => updateOrderCountHandler(count - 1, elem)}
                      />
                      <ControlInput
                        warning={count < 1 || count > 999}
                        defaultValue={count}
                        onBlur={e =>
                          updateOrderCountHandler(e.target.value, elem)
                        }
                      />
                      <ControlButtons
                        src={plus}
                        alt={"plus"}
                        onClick={() => updateOrderCountHandler(count + 1, elem)}
                      />
                    </CountContainer>
                    <PriceContainer>
                      <h3>{(price * count).toFixed(2)} $</h3>
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
  );
};

const mapStateToProps = state => {
  const { orders } = state.goodsReducers;

  return {
    orders
  };
};

const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketModal);