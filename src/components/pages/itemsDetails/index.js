import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setGoodsList, setOrders } from "../../../store/actions";
import Header from "../../header";
import { signOutHandler } from "../../../utils/handlers";
import ItemsDetailContainer from "../itemsDetails/itemsDetailsContainer";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const ItemsDetail = props => {
  const { match, setGoodsList, goods, profile, setOrdersList } = props;

  const [changedProduct, changeProduct] = useState({});
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const [isOpenBasketModal, setOpenBasketModal] = useState(false);

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

  useEffect(() => {
    goods.forEach(elem => {
      const { goodId } = elem;

      goodId === match.params.id && changeProduct(elem);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods]);

  return (
    <MainContainer>
      <Header
        signOutHandler={signOutHandler}
        isOpenBasketModal={isOpenBasketModal}
        setOpenBasketModal={setOpenBasketModal}
        profile={profile}
        mode={"singleItem"}
      />
      <ItemsDetailContainer changedProduct={changedProduct} />
    </MainContainer>
  );
};

const mapStateToProps = state => {
  const { orders, goods } = state.goodsReducers;

  return {
    orders,
    goods
  };
};

const mapDispatchToProps = dispatch => ({
  setGoodsList: goodsList => dispatch(setGoodsList(goodsList)),
  setOrdersList: orders => dispatch(setOrders(orders))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsDetail);
