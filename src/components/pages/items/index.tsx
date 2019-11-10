import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../header";
import { IProfile } from "../../modals/basketModal";
import { IProfileReducers } from "../../../utils/interfaces";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setGoodsList, setOrders } from "../../../store/actions";
import GoodsContainer from "./goodsContainer";

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

const Items = () => {
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const profile = useSelector<IProfileReducers, IProfile>(
    state => state.profile
  );
  const dispatch = useDispatch();

  if (!goodsData.called) {
    getGoods({
      collection: "goods",
      actionHandler: goods => dispatch(setGoodsList(goods))
    });
  }

  if (!ordersData.called && profile.uid) {
    getOrders({
      collection: "orders",
      singleDoc: profile.uid,
      actionHandler: orders => dispatch(setOrders(orders))
    });
  }

  return (
    <ItemsContainer>
      <Header mode={"items"} />
      <GoodsContainer />
    </ItemsContainer>
  );
};

export default Items;
