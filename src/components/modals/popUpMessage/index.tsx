import React, { useEffect } from "react";

import { GlobalStyleComponent } from "../../assets/assets";
import { MainContainer } from "./components";

interface IProps {
  statusPopup: string | null;
  setStatusPopUp: (status: string | null) => void;
}

const PopUpMessage = (props: IProps) => {
  const { statusPopup, setStatusPopUp } = props;
  useEffect(() => {
    if (statusPopup) {
      setTimeout(() => {
        setStatusPopUp(null);
      }, 3000);
    }
  }, [statusPopup]);
  return (
    <GlobalStyleComponent>
      <MainContainer statusPopup={statusPopup}>
        {statusPopup === "warning"
          ? "При сохранении произошла ошибка"
          : statusPopup === "success"
          ? "Сохранение успешно"
          : ""}
      </MainContainer>
    </GlobalStyleComponent>
  );
};

export default PopUpMessage;
