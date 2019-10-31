import React from "react";
import styled, { css } from "styled-components";

const MainContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const List = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  list-style: none;
  position: relative;
`;

const MenuElement = styled.li`
  cursor: pointer;
`;

const MenuSlider = styled.div`
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

const Navbar = ({
  changedMode,
  setChangedMode
}: {
  changedMode: string;
  setChangedMode: (mode: string) => void;
}) => {
  return (
    <MainContainer>
      <List>
        <MenuElement onClick={() => setChangedMode("orders")}>
          Заказы
        </MenuElement>
        <MenuElement onClick={() => setChangedMode("updateGoods")}>
          Добавление товаров
        </MenuElement>
        <MenuSlider mode={changedMode} />
      </List>
    </MainContainer>
  );
};

export default Navbar;
