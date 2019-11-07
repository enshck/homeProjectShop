import styled, { css } from "styled-components";

export const MainContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const List = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  list-style: none;
  position: relative;
`;

export const MenuElement = styled.li`
  cursor: pointer;
`;

export const MenuSlider = styled.div`
  border-bottom: 2px solid blue;
  position: absolute;
  bottom: 0;
  transition: 0.5s;
  ${({ mode }: { mode: String }) =>
    mode === "orders" &&
    css`
      left: 0;
      width: 55px;
    `}
  ${({ mode }: { mode: String }) =>
    mode === "updateGoods" &&
    css`
      left: 140px;
      width: 160px;
    `}
`;
