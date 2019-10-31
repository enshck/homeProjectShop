import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  ISortTypeReducers,
  IOrdersReducers,
  IIsOpenBasketModalReducers
} from "../utils/interfaces";

import { IProfile, IOrderElement } from "./modals/basketModal";
import gridImg from "../img/grid.png";
import listImg from "../img/list.png";
import basket from "../img/basket.png";
import { setSortGoods, setOpenBasketModal } from "../store/actions";
import { HeaderButton } from "./assets/assets";
import BasketModal from "./modals/basketModal";

const MainContainer = styled.div`
  border-bottom: 1px solid #cdd2d5;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  top: 0;
`;
const SortContainer = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-between;
  ${({
    singleItem,
    adminPanel
  }: {
    singleItem: boolean;
    adminPanel: boolean;
  }) =>
    (singleItem || adminPanel) &&
    css`
      width: 100px;
    `}
`;
const SortButtonsContainer = styled.div`
  display: flex;
`;

const CountOrders = styled.div`
  display: block;
  position: absolute;
  top: -12px;
  right: -12px;
  min-width: 23px;
  height: 23px;
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 50px;
  font-size: 17px;
  line-height: 23px;
  color: #fff;
  text-align: center;
  background-color: #fb3f4c;
`;

const Header = ({
  signOutHandler,
  profile,
  mode
}: {
  signOutHandler: () => void;
  profile: IProfile;
  mode: String;
}) => {
  const modalElement = document.getElementById("modal");
  const sortType = useSelector<ISortTypeReducers, string>(
    state => state.sortType
  );
  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );
  const isOpenBasketModal = useSelector<IIsOpenBasketModalReducers, boolean>(
    state => state.isOpenBasketModal
  );
  const dispatch = useDispatch();

  return (
    <MainContainer>
      {modalElement &&
        ReactDOM.createPortal(<BasketModal profile={profile} />, modalElement)}
      {mode === "singleItem" ? (
        <h3>Детальный просмотр товара:</h3>
      ) : mode === "adminPanel" ? (
        <h3>Панель администратора</h3>
      ) : (
        <h3>Товары:</h3>
      )}
      <SortContainer
        singleItem={mode === "singleItem"}
        adminPanel={mode === "adminPanel"}
      >
        <HeaderButton
          basket
          onClick={() =>
            orders.length > 0 && dispatch(setOpenBasketModal(true))
          }
        >
          <CountOrders>{orders.length}</CountOrders>
          <img src={basket} alt={"basket"} />
        </HeaderButton>
        {mode !== "singleItem" && mode !== "adminPanel" && (
          <SortButtonsContainer>
            <HeaderButton
              sortButton
              active={sortType === "grid"}
              onClick={() => dispatch(setSortGoods("grid"))}
            >
              <img src={gridImg} alt={"grid"} />
            </HeaderButton>

            <HeaderButton
              sortButton
              active={sortType === "list"}
              onClick={() => dispatch(setSortGoods("list"))}
            >
              <img src={listImg} alt={"list"} />
            </HeaderButton>
          </SortButtonsContainer>
        )}

        <HeaderButton signOut onClick={signOutHandler}>
          Выйти
        </HeaderButton>
      </SortContainer>
    </MainContainer>
  );
};

export default Header;
