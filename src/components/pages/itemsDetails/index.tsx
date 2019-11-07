import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IGoodsReducers } from "../../../utils/interfaces";

import { useGetFirebaseData } from "../../../customHooks/useGetFirebaseData";
import { IGoodsData, IProfile } from "../../modals/basketModal";
import { setGoodsList, setOrders } from "../../../store/actions";
import Header from "../../header";
import ArrowBack from "../../../img/arrowBack.png";
import ItemsDetailContainer from "./ItemsDetailsContainer";

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

interface IProps {
  match: {
    params: {
      id: string;
    };
  };
  profile: IProfile;
}

const ItemsDetail = (props: IProps) => {
  const { match, profile } = props;
  const [changedProduct, changeProduct] = useState<any>({
    parametrs: {}
  });
  const [getGoods, goodsData] = useGetFirebaseData();
  const [getOrders, ordersData] = useGetFirebaseData();
  const dispatch = useDispatch();
  const goods = useSelector<IGoodsReducers, IGoodsData[]>(state => state.goods);

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

  useEffect(() => {
    goods.forEach((elem: { goodId: string }) => {
      const { goodId } = elem;

      goodId === match.params.id && changeProduct(elem);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goods]);

  return (
    <MainContainer>
      <ButtonBack to={"/items"}>
        <img src={ArrowBack} alt={"back"} />
      </ButtonBack>
      <Header mode={"singleItem"} />
      <ItemsDetailContainer changedProduct={changedProduct} />
    </MainContainer>
  );
};

export default ItemsDetail;
