import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import firebase from "../../../utils/firebase";
import Header from "./header";
import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { setGoodsList } from "../../../store/actions";
import GoodsContainer from "../../../components/pages/items/goodsContainer";

const ItemsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const Items = props => {
  const [getGoods, goodsData] = useGetFirebaseData();
  const { setGoodsList } = props;

  if (!goodsData.called) {
    getGoods({
      collection: "goods",
      actionHandler: setGoodsList
    });
  }

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <ItemsContainer>
      <Header signOutHandler={signOutHandler} />
      <GoodsContainer />
    </ItemsContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  setGoodsList: goodsList => dispatch(setGoodsList(goodsList))
});

export default connect(
  null,
  mapDispatchToProps
)(Items);
