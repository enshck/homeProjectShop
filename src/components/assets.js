import styled, { css } from "styled-components";

export const HeaderButton = styled.div`
  background: #3b3e47;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;  
  ${props =>
    props.active &&
    css`
      background: #d9b176;
    `}
  ${props =>
    props.sortButton &&
    css`
      width: 30px;
      height: 30px;
      img {
        width: 20px;
        height: 20px;
      }
    `}
  ${props =>
    props.signOut &&
    css`
      padding: 5px;
    `}
`;
