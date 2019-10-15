import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { setOrders } from "../store/actions";
import close from "../img/close.png";
import plus from "../img/plus.png";
import minus from "../img/minus.png";

const MainModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 900;
  position: absolute;
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
  padding: 16px 24px 32px;
  overflow: auto;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0;
  right: -45px;
  cursor: pointer;
`;

const GoodsContainer = styled.div``;

const SingleGoodsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
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
`;

const CountContainer = styled.div`
  display: flex;
`;

const InfoContainer = styled.div``;

const BasketModal = props => {
  const { setOpenBasketModal, setOrders, orders } = props;

  return (
    <MainModalContainer>
      <ModalContainer>
        <CloseButton
          src={close}
          alt={"close"}
          onClick={() => setOpenBasketModal(false)}
        />
        <ModalContent>
          <GoodsContainer>
            {orders.map(elem => {
              const { count, goodsData } = elem;
              const { goodId, goodName, isSale, pictureUrl, price } = goodsData;

              return (
                <SingleGoodsContainer key={goodId}>
                  <ProductPicture src={pictureUrl} alt={"pictureImg"} />
                  <InfoContainer>
                    <h2>{goodName}</h2>
                    <p>{price}$</p>
                  </InfoContainer>
                  <CountContainer>
                    <img src={minus} alt={"minus"} />
                    <input defaultValue={count} />
                    <img src={plus} alt={"plus"} />
                  </CountContainer>
                  <h3>Сумма: {price * count} $</h3>
                </SingleGoodsContainer>
              );
            })}
          </GoodsContainer>
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
