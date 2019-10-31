import React from "react";
import styled from "styled-components";

import NavBar from "./navbar";
import OrdersContainer from "./ordersContainer";
import UpdateGoodsContainer from "./updateGoodsContainer";

const MainContainer = styled.div``;

const ContentContainer = styled.div`
  overflow: auto;
  height: calc(100vh - 130px);
`;

const AdminContainer = ({
  changedMode,
  setChangedMode
}: {
  changedMode: string;
  setChangedMode: (mode: string) => void;
}) => {
  return (
    <MainContainer>
      <NavBar changedMode={changedMode} setChangedMode={setChangedMode} />
      <ContentContainer>
        {changedMode === "orders" ? (
          <OrdersContainer />
        ) : (
          <UpdateGoodsContainer />
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default AdminContainer;
