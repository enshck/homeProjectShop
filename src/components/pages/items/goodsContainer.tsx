import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IGoodsData, IOrderElement, IProfile } from "../../modals/basketModal";
import {
  IGoodsReducers,
  ISortTypeReducers,
  IOrdersReducers
} from "../../../utils/interfaces";
import { setOrders, setOpenBasketModal } from "../../../store/actions";
import { buyButtonHandler } from "../../../utils/handlers";

const MainContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  ${({ sortType }: { sortType: String }) =>
    sortType === "grid" &&
    css`
      flex-direction: row;
      overflow: visible;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
    `}
`;
const SingleGoodContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background: #fff;
  img {
    width: 80px;
    height: 100px;
  }
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  padding: 15px;
  ${({ sortType }: { sortType: String }) =>
    sortType === "grid" &&
    css`
      border: 1px solid #eaeaea
      flex-direction: column;
      @media (max-width: 950px) {
        img {
          width: 120px;
          height: 140px;
        }
  }
    `};
  ${props =>
    props.sortType === "list" &&
    css`
      margin: 10px;
    `};
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  ${({ sortType }: { sortType: String }) =>
    sortType === "grid" &&
    css`
      align-items: center;
    `}
`;

const InfoContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  ${({ sortType }: { sortType: String }) =>
    sortType === "grid" &&
    css`
      flex-direction: column;
      align-items: center;
    `}
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
    color: #fb3f4c;
  }
`;

const ButtonBuy = styled.div`
  background: #00a046;
  padding: 8px 20px;
  font-size: 24px;
  border-radius: 5px;
  margin-top: 5px;
  color: #fff;
  cursor: pointer;
`;

const GoodsRow = styled.div`
  @media (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
  }
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const DetailsButton = styled(Link)`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  text-decoration: underline;
  border-radius: 8px;
  margin-top: 5px;
  cursor: pointer;
`;

const SaleContainer = styled.div`
  padding: 5px 12px;
  background: #fb3f4c;
  color: #fff;
  border-radius: 5px;
`;

const GoodsContainer = ({ profile }: { profile: IProfile }) => {
  const [sortedList, setSortedList] = useState<IGoodsData[][]>([]);
  const goods = useSelector<IGoodsReducers, IGoodsData[]>(state => state.goods);
  const sortType = useSelector<ISortTypeReducers, string>(
    state => state.sortType
  );
  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );
  const dispatch = useDispatch();

  console.log(goods, "goods");

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
                    setOrders,
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
