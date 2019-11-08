import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ISortTypeReducers,
  IOrdersReducers,
  IProfileReducers,
  IIsAdminReducers
} from "../../utils/interfaces";
import { signOutHandler } from "../../utils/handlers";
import { IProfile, IOrderElement } from "../modals/basketModal";
import gridImg from "../../img/grid.png";
import listImg from "../../img/list.png";
import basket from "../../img/basket.png";
import { setSortGoods, setOpenBasketModal } from "../../store/actions";
import { HeaderButton } from "../assets/assets";
import BasketModal from "../modals/basketModal";
import AdminPanelIcon from "../../img/adminPanel.png";
import {
  MainContainer,
  ButtonLink,
  CountOrders,
  SortButtonsContainer,
  SortContainer
} from "./components";

interface IProps {
  mode: string;
}

const Header = (props: IProps) => {
  const { mode } = props;
  const modalElement = document.getElementById("modal");
  const sortType = useSelector<ISortTypeReducers, string>(
    state => state.sortType
  );
  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );
  const profile = useSelector<IProfileReducers, IProfile>(
    state => state.profile
  );
  const isAdmin = useSelector<IIsAdminReducers, boolean>(
    state => state.isAdmin
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
            {isAdmin && (
              <ButtonLink to={"adminPanel"}>
                <img src={AdminPanelIcon} alt={"linkIcon"} />
              </ButtonLink>
            )}
          </SortButtonsContainer>
        )}
        {mode !== "adminPanel" && (
          <HeaderButton signOut onClick={signOutHandler}>
            Выйти
          </HeaderButton>
        )}
      </SortContainer>
    </MainContainer>
  );
};

export default Header;
