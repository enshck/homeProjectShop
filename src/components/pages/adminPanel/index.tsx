import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../header";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import {
  setAdminOrders,
  setGoodsList,
  setOrders
} from "../../../store/actions";
import { IProfile } from "../../modals/basketModal";
import AdminContainer from "./adminContainer";
import ArrowBack from "../../../img/arrowBack.png";

const MainContainer = styled.div``;

const ButtonBack = styled(Link)`
  position: absolute;
  width: 3px;
  height: 3px;
  bottom: 50px;
  left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 140px 53px rgba(74, 189, 150, 0.86);
  -moz-box-shadow: 0px 0px 140px 53px rgba(74, 189, 150, 0.86);
  box-shadow: 0px 0px 140px 53px rgba(74, 189, 150, 0.86);
  img {
    width: 60px;
    height: 60px;
  }
`;

interface IProps {
  profile: IProfile;
}

const AdminPanel = (props: IProps) => {
  const { profile } = props;
  const [changedMode, setChangedMode] = useState("orders");
  const [getAdminOrdersData, adminOrdersData] = useGetFirebaseData();
  const [getGoodsData, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const dispatch = useDispatch();

  if (!adminOrdersData.called) {
    getAdminOrdersData({
      collection: "successOrders",
      actionHandler: orders => dispatch(setAdminOrders(orders))
    });
  }

  if (!goodsData.called) {
    getGoodsData({
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
    <MainContainer>
      <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"adminPanel"} />
      <AdminContainer
        changedMode={changedMode}
        setChangedMode={setChangedMode}
      />
    </MainContainer>
  );
};

export default AdminPanel;
