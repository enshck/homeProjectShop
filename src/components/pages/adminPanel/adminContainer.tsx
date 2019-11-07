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

interface IProps {
  changedMode: string;
  setChangedMode: (mode: string) => void;
}

const AdminContainer = (props: IProps) => {
  const { changedMode, setChangedMode } = props;
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
