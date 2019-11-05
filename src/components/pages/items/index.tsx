import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Header from "../../header";
import { IProfile } from "../../modals/basketModal";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setGoodsList, setOrders } from "../../../store/actions";
import GoodsContainer from "./goodsContainer";
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

const Items = ({
  profile,
  role
}: {
  profile: IProfile;
  role: string | null;
}) => {
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const dispatch = useDispatch();

  if (!goodsData.called) {
    getGoods({
      collection: "goods",
      actionHandler: goods => dispatch(setGoodsList(goods))
    });
  }

  if (!ordersData.called && profile) {
    getOrders({
      collection: "orders",
      singleDoc: profile.uid,
      actionHandler: orders => dispatch(setOrders(orders))
    });
  }

  return (
    <ItemsContainer>
      <Header
        signOutHandler={signOutHandler}
        profile={profile}
        mode={"items"}
        role={role}
      />
      <GoodsContainer profile={profile} />
    </ItemsContainer>
  );
};

export default Items;
