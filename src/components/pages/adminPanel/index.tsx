import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../header";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setAdminOrders, setGoodsList } from "../../../store/actions";
import { IProfile } from "../../modals/basketModal";
import { signOutHandler } from "../../../utils/handlers";
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

const AdminPanel = ({ profile }: { profile: IProfile }) => {
  const [changedMode, setChangedMode] = useState("orders");
  const [getAdminOrdersData, adminOrdersData] = useGetFirebaseData();
  const [getGoodsData, goodsData] = useGetFirebaseData();
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

  return (
    <MainContainer>
      <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header
        signOutHandler={signOutHandler}
        profile={profile}
        mode={"adminPanel"}
      />
      <AdminContainer
        changedMode={changedMode}
        setChangedMode={setChangedMode}
      />
    </MainContainer>
  );
};

export default AdminPanel;
