import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";

import firebase from "../../../utils/firebase";
import { setOrders } from "../../../store/actions";
import { getOrders } from "../../../utils/handlers";

const MainContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  ${props =>
    props.sortType === "grid" &&
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
  img {
    width: 80px;
    height: 100px;
  }
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  padding: 15px;
  ${props =>
    props.sortType === "grid" &&
    css`
      border: none;
      flex-direction: column;
    `}
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  ${props =>
    props.sortType === "grid" &&
    css`
      align-items: center;
    `}
`;

const InfoContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  ${props =>
    props.sortType === "grid" &&
    css`
      flex-direction: column;
      align-items: center;
    `}
`;

const SaleBlock = styled.div`
  background: #a3c964;
  color: #64872d;
  padding: 5px 50px;
  border-radius: 5px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonBuy = styled.div`
  background: #00a046;
  padding: 5px 50px;
  border-radius: 5px;
  margin-top: 5px;
  color: #fff;
  cursor: pointer;
`;

const GoodsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const GoodsContainer = props => {
  const {
    goods,
    sortType,
    setOpenBasketModal,
    orders,
    profile,
    setOrders
  } = props;
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    let singleGoodsListArray = [];
    const result = [];

    goods.forEach((elem, index) => {
      singleGoodsListArray.push(elem);

      if ((index % 3 === 0 && index !== 0) || index === goods.length - 1) {
        result.push(singleGoodsListArray);
        singleGoodsListArray = [];
      }
    });

    setSortedList(result);
  }, [goods]);

  const buyButtonHandler = singleGood => {
    const isCreated = orders.some(
      elem => elem.goodsData.goodId === singleGood.goodId
    );

    if (isCreated) {
      orders.forEach((elem, item) => {
        const { goodsData } = elem;
        if (goodsData.goodId === singleGood.goodId) {
          orders[item].count++;
        }
      });
    } else {
      orders.push({
        count: 1,
        goodsData: singleGood
      });
    }

    firebase
      .firestore()
      .collection("orders")
      .doc(profile.uid)
      .set({
        ordersData: orders
      })
      .then(result => {
        getOrders(profile.uid, setOrders);
        setOpenBasketModal(true);
      })
      .catch(err => console.log(err));
  };

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
                      <p>Product id:{goodId}</p>
                    </NameContainer>
                  </InfoContainer>
                  <ControlContainer>
                    <h1>${parseFloat(price).toFixed(2)}</h1>
                    {isSale && <SaleBlock>Скидка</SaleBlock>}
                    <ButtonBuy onClick={() => buyButtonHandler(elem)}>
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
                <p>Product id:{goodId}</p>
              </NameContainer>
            </InfoContainer>
            <ControlContainer>
              <h1>${parseFloat(price).toFixed(2)}</h1>
              {isSale && <SaleBlock>Скидка</SaleBlock>}
              <ButtonBuy onClick={() => buyButtonHandler(elem)}>
                Купить
              </ButtonBuy>
            </ControlContainer>
          </SingleGoodContainer>
        );
      })}
    </MainContainer>
  );
};

const mapStateToProps = state => {
  const { goods, sortType, orders } = state.goodsReducers;

  return {
    goods,
    sortType,
    orders
  };
};

const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoodsContainer);
