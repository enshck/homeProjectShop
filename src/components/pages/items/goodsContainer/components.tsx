import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  overflow: auto;
  ${({ sortType }: { sortType: string }) =>
    sortType === "grid" &&
    css`
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      @media (max-width: 950px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 550px) {
        grid-template-columns: 1fr;
      }
    `}
`;
export const SingleGoodContainer = styled.div`
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
  transition: 0.2s;
  ${({ sortType }: { sortType: string }) =>
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

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  p {
    text-align: center;
  }
  ${({ sortType }: { sortType: string }) =>
    sortType === "grid" &&
    css`
      align-items: center;
    `}
`;

export const InfoContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  ${({ sortType }: { sortType: string }) =>
    sortType === "grid" &&
    css`
      flex-direction: column;
      align-items: center;
    `}
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
    color: #fb3f4c;
  }
`;

export const ButtonBuy = styled.div`
  background: #00a046;
  padding: 8px 20px;
  font-size: 24px;
  border-radius: 5px;
  margin-top: 5px;
  color: #fff;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background: #26af62;
  }
`;

export const DetailsButton = styled(Link)`
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

export const SaleContainer = styled.div`
  padding: 5px 12px;
  background: #fb3f4c;
  color: #fff;
  border-radius: 5px;
`;
