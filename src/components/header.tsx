import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { connect } from "react-redux";

import { IProfile, IOrderElement } from "../components/basketModal";
import gridImg from "../img/grid.png";
import listImg from "../img/list.png";
import basket from "../img/basket.png";
import { setSortGoods } from "../store/actions";
import { HeaderButton } from "./assets";
import BasketModal from "./basketModal";

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
  ${({ singleItem }: { singleItem: boolean }) =>
    singleItem &&
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

interface IHeaderProps {
  signOutHandler: () => void;
  sortType: String;
  setTypeSort: (type: string) => void;
  setOpenBasketModal: (status: boolean) => void;
  isOpenBasketModal: boolean;
  profile: IProfile;
  orders: IOrderElement[];
  mode: String;
}

const Header = ({
  signOutHandler,
  sortType,
  setTypeSort,
  setOpenBasketModal,
  isOpenBasketModal,
  profile,
  orders,
  mode
}: IHeaderProps) => {
  const modalElement = document.getElementById("modal");
  return (
    <MainContainer>
      {isOpenBasketModal &&
        modalElement &&
        ReactDOM.createPortal(
          <BasketModal
            setOpenBasketModal={setOpenBasketModal}
            profile={profile}
          />,
          modalElement
        )}
      {mode === "singleItem" ? (
        <h3>Детальный просмотр товара:</h3>
      ) : (
        <h3>Товары:</h3>
      )}
      <SortContainer singleItem={mode === "singleItem"}>
        <HeaderButton
          basket
          onClick={() => orders.length > 0 && setOpenBasketModal(true)}
        >
          <CountOrders>{orders.length}</CountOrders>
          <img src={basket} alt={"basket"} />
        </HeaderButton>
        {mode !== "singleItem" && (
          <SortButtonsContainer>
            <HeaderButton
              sortButton
              active={sortType === "grid"}
              onClick={() => setTypeSort("grid")}
            >
              <img src={gridImg} alt={"grid"} />
            </HeaderButton>

            <HeaderButton
              sortButton
              active={sortType === "list"}
              onClick={() => setTypeSort("list")}
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

const mapStateToProps = (state: any) => {
  const { sortType, orders } = state.goodsReducers;

  return {
    sortType,
    orders
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setTypeSort: (sortType: string) => dispatch(setSortGoods(sortType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
