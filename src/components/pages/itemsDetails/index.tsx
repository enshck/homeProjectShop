import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { IGoodsData, IProfile, IOrderElement } from "../../basketModal";
import {
  setGoodsList,
  setOrders,
  setOpenBasketModal
} from "../../../store/actions";
import Header from "../../header";
import ArrowBack from "../../../img/arrowBack.png";
import { signOutHandler } from "../../../utils/handlers";
import ItemsDetailContainer from "./itemsDetailsContainer";

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

const ItemsDetail = ({
  match,
  setGoodsList,
  goods,
  profile,
  setOrdersList,
  isOpenBasketModal,
  setOpenBasketModal
}: {
  match: {
    params: {
      id: number;
    };
  };
  setGoodsList: (goodsList: IGoodsData[]) => void;
  goods: IGoodsData[];
  profile: IProfile;
  setOrdersList: (orders: IOrderElement[]) => void;
  isOpenBasketModal: boolean;
  setOpenBasketModal: (status: boolean) => void;
}) => {
  const [changedProduct, changeProduct] = useState<any>({
    parametrs: {}
  });
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();

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
    goods.forEach((elem: { goodId: string }) => {
      const { goodId } = elem;

      +goodId === match.params.id && changeProduct(elem);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods]);

  return (
    <MainContainer>
      <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header
        signOutHandler={signOutHandler}
        isOpenBasketModal={isOpenBasketModal}
        setOpenBasketModal={setOpenBasketModal}
        profile={profile}
        mode={"singleItem"}
      />
      <ItemsDetailContainer changedProduct={changedProduct} profile={profile} />
    </MainContainer>
  );
};

const mapStateToProps = (state: any) => {
  const { orders, goods, isOpenBasketModal } = state.goodsReducers;

  return {
    orders,
    goods,
    isOpenBasketModal
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setGoodsList: (goodsList: IGoodsData[]) => dispatch(setGoodsList(goodsList)),
  setOrdersList: (orders: IOrderElement[]) => dispatch(setOrders(orders)),
  setOpenBasketModal: (isOpen: boolean) => dispatch(setOpenBasketModal(isOpen))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsDetail);
