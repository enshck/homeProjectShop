import styled, { css } from "styled-components";

interface IProps {
  active?: boolean;
  sortButton?: boolean;
  signOut?: boolean;
  basket?: boolean;
}

export const GlobalStyleComponent = styled.div`
  * {
    font-family: "Proxima Nova Regular", "Proxima Nova Thin", "Roboto",
      "SF UI Display Regular", sans-serif;
    letter-spacing: 0.2px;
    box-sizing: border-box;
  }
  body {
    font-family: "Proxima Nova Regular", "Proxima Nova Thin",
      "SF UI Display Regular", sans-serif;
    background-color: #eaeef2;
    margin: 0px;
    padding: 0px;
  }
`;

export const HeaderButton = styled.div`
  &:hover {
    background: #223e92
  }
  background: #3b3e47;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
    ${({ active }: IProps) =>
      active &&
      css`
        background: #d9b176;
        &:hover {
          background: #cba979;
        }
      `}
    ${({ sortButton }: IProps) =>
      sortButton &&
      css`
        width: 30px;
        height: 30px;
        margin-left: 10px;
        img {
          width: 20px;
          height: 20px;
        }
      `}
    ${({ signOut }: IProps) =>
      signOut &&
      css`
        padding: 5px;
      `}
    ${({ basket }: IProps) =>
      basket &&
      css`
        width: 30px;
        height: 30px;

        img {
          width: 30px;
          height: 30px;
        }
      `};
`;

export const StatusContainer = styled.div`
  padding: 10px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 5px;
  cursor: pointer;
  color: #fff;
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "ordered" &&
    css`
      background: #3d9ec8;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "cancelled" &&
    css`
      background: #da5f57;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "delivered" &&
    css`
      background: #279240;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "paidFor" &&
    css`
      background: #86a760;
    `};
`;
