import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IGoodsData,
  IOrderElement,
  IProfile
} from "../../../modals/basketModal";
import {
  IGoodsReducers,
  ISortTypeReducers,
  IOrdersReducers,
  IProfileReducers
} from "../../../../utils/interfaces";
import { setOrders, setOpenBasketModal } from "../../../../store/actions";
import { buyButtonHandler } from "../../../../utils/handlers";
import {
  MainContainer,
  InfoContainer,
  NameContainer,
  ButtonBuy,
  SaleContainer,
  DetailsButton,
  SingleGoodContainer,
  ControlContainer
} from "./components";

const GoodsContainer = () => {
  const goods = useSelector<IGoodsReducers, IGoodsData[]>(state => state.goods);
  const sortType = useSelector<ISortTypeReducers, string>(
    state => state.sortType
  );
  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );
  const profile = useSelector<IProfileReducers, IProfile>(
    state => state.profile
  );
  const dispatch = useDispatch();

  return (
    <MainContainer sortType={sortType}>
      {goods.map(elem => {
        const { goodId, goodName, isSale, pictureUrl, price } = elem;

        return (
          <SingleGoodContainer key={goodId} sortType={sortType}>
            <InfoContainer sortType={sortType}>
              <img src={pictureUrl} alt={"goodsPicture"} />
              <NameContainer sortType={sortType}>
                <h2>{goodName}</h2>
                <p>Идентификатор: {goodId}</p>
              </NameContainer>
            </InfoContainer>
            <ControlContainer>
              <h1>${parseFloat(price).toFixed(2)}</h1>
              {isSale && <SaleContainer>SALE</SaleContainer>}
              <DetailsButton to={`/items/${goodId}`}>Подробнее</DetailsButton>
              <ButtonBuy
                onClick={() =>
                  buyButtonHandler({
                    orders: orders,
                    singleGood: elem,
                    profile,
                    setOrders: orders => dispatch(setOrders(orders)),
                    setOpenBasketModal: status =>
                      dispatch(setOpenBasketModal(status))
                  })
                }
              >
                Купить
              </ButtonBuy>
            </ControlContainer>
          </SingleGoodContainer>
        );
      })}
    </MainContainer>
  );
};

export default GoodsContainer;
