import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const MainContainer = styled.div`
  border-bottom: 1px solid #cdd2d5;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  top: 0;
`;
export const SortContainer = styled.div`
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
export const SortButtonsContainer = styled.div`
  display: flex;
`;

export const CountOrders = styled.div`
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

export const ButtonLink = styled(Link)`
  background: #3b3e47;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  img {
    width: 80%;
    height: 80%;
  }
  &:hover {
    background: #223e92;
  }
`;
