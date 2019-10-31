import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../header";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setAdminOrders, setGoodsList } from "../../../store/actions";
import { IProfile } from "../../modals/basketModal";
import { signOutHandler } from "../../../utils/handlers";
import AdminContainer from "./adminContainer";

const MainContainer = styled.div``;

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
