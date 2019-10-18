import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Header from "../../header";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setGoodsList, setOrders } from "../../../store/actions";
import GoodsContainer from "../../../components/pages/items/goodsContainer";
import { signOutHandler } from "../../../utils/handlers";

const ItemsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const Items = props => {
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const [isOpenBasketModal, setOpenBasketModal] = useState(false);

  const { setGoodsList, profile, setOrdersList } = props;

  if (!goodsData.called) {
    getGoods({
      collection: "goods",
      actionHandler: setGoodsList
    });
  }

  if (!ordersData.called && profile) {
    getOrders({
      collection: "orders",
      singleDoc: profile.uid,
      actionHandler: setOrdersList
    });
  }

  return (
    <ItemsContainer>
      <Header
        signOutHandler={signOutHandler}
        isOpenBasketModal={isOpenBasketModal}
        setOpenBasketModal={setOpenBasketModal}
        profile={profile}
      />
      <GoodsContainer
        setOpenBasketModal={setOpenBasketModal}
        profile={profile}
      />
    </ItemsContainer>
  );
};

const mapStateToProps = state => {
  const { orders } = state.goodsReducers;

  return {
    orders
  };
};

const mapDispatchToProps = dispatch => ({
  setGoodsList: goodsList => dispatch(setGoodsList(goodsList)),
  setOrdersList: orders => dispatch(setOrders(orders))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
