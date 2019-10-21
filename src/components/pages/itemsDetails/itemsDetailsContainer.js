import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ZoomablePicture from "../../zoomablePicture";
import { setOrders, setOpenBasketModal } from "../../../store/actions";
import { buyButtonHandler } from "../../../utils/handlers";

const MainContainer = styled.div`
  padding: 0 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 400;
    font-size: 30px;
    color: #221f1f;
    margin: 0;
  }
  p {
    padding: 5px 10px;
    font-size: 14px;
    color: #999;
    background-color: #fef2b8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PictureProduct = styled.div`
  width: 35%;
  max-width: 450px;
  max-height: 600px;
  min-width: 200px;
  min-height: 300px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
`;

const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 0;
  }
`;

const PriceContainer = styled.div`
  background: #fef2b8;
  padding: 3px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  white-space: nowrap;
  text-align: center;
  font-size: 32px;
  border-radius: 5px;
`;

const ButtonBuy = styled.div`
  padding: 8px 20px;
  font-size: 24px;
  background: #00a046;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
`;

const ParametrsContainer = styled.ul`
  list-style: none;
`;

const ItemsDetailsContainer = props => {
  const { changedProduct, profile, orders, setOpenBasketModal } = props;
  const {
    goodId,
    goodName,
    isSale,
    pictureUrl,
    price,
    parametrs
  } = changedProduct;
  const { color, internalMem, ram, sizeScreen, weight } = parametrs;

  return (
    <MainContainer>
      <InfoContainer>
        <h3>{goodName}</h3>
        <p>Код товара: {goodId}</p>
      </InfoContainer>
      <ControlsContainer>
        <PictureProduct>
          <ZoomablePicture url={pictureUrl} />
        </PictureProduct>
        <Controls>
          <PriceContainer>{price} $</PriceContainer>
          {isSale && <p>SALE</p>}
          <ButtonBuy
            onClick={() => {
              buyButtonHandler({
                orders,
                singleGood: changedProduct,
                profile,
                setOrders,
                setOpenBasketModal
              });
            }}
          >
            Купить
          </ButtonBuy>
          <ParametrsContainer>
            <h2>Характеристики:</h2>
            <li>Цвет: {color}</li>
            <li>Внутреняя память: {internalMem} ГБ</li>
            <li>Оперативная память: {ram} ГБ</li>
            <li>Диагональ экрана: {sizeScreen}``</li>
            <li>Вес: {weight} гр.</li>
          </ParametrsContainer>
        </Controls>
      </ControlsContainer>
    </MainContainer>
  );
};

ItemsDetailsContainer.propTypes = {
  changedProduct: PropTypes.object.isRequired,
  profile: PropTypes.object,
  orders: PropTypes.array,
  setOpenBasketModal: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { orders, isOpenBasketModal } = state.goodsReducers;

  return {
    orders,
    isOpenBasketModal
  };
};

const mapDispatchToProps = dispatch => ({
  setOrdersList: orders => dispatch(setOrders(orders)),
  setOpenBasketModal: isOpen => dispatch(setOpenBasketModal(isOpen))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsDetailsContainer);
