import React from "react";

import { MainContainer, List, MenuElement, MenuSlider } from "./components";

interface IProps {
  changedMode: string;
  setChangedMode: (mode: string) => void;
}

const Navbar = (props: IProps) => {
  const { changedMode, setChangedMode } = props;
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
