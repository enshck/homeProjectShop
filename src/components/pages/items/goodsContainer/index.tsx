import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  GoodsRow,
  SaleContainer,
  DetailsButton,
  SingleGoodContainer,
  ControlContainer
} from "./components";

const GoodsContainer = () => {
  const [sortedList, setSortedList] = useState<IGoodsData[][]>([]);
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

  useEffect(() => {
    let singleGoodsListArray: IGoodsData[] = [];
    const result: IGoodsData[][] = [];

    goods.forEach((elem, index) => {
      singleGoodsListArray.push(elem);

      if ((index % 3 === 0 && index !== 0) || index === goods.length - 1) {
        result.push(singleGoodsListArray);
        singleGoodsListArray = [];
      }
    });

    setSortedList(result);
  }, [goods]);

  if (sortType === "grid") {
    return (
      <MainContainer sortType={sortType}>
        {sortedList.map(row => (
          <GoodsRow>
            {row.map(elem => {
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
                    <DetailsButton to={`/items/${goodId}`}>
                      Подробнее
                    </DetailsButton>
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
          </GoodsRow>
        ))}
      </MainContainer>
    );
  }

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
