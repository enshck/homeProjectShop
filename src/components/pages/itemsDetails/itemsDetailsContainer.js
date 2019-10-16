import React from "react";
import styled from "styled-components";

const MainContainer = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const PictureProduct = styled.img``;

const ItemsDetailsContainer = props => {
  const { changedProduct } = props;
  const { goodId, goodName, isSale, pictureUrl, price } = changedProduct;

  return (
    <MainContainer>
      <InfoContainer>
        <h3>{goodName}</h3>
        <p>Код товара: {goodId}</p>
      </InfoContainer>
      <PictureProduct src={pictureUrl} alt={"picture"} />
    </MainContainer>
  );
};

export default ItemsDetailsContainer;
