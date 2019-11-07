import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  IOrdersReducers,
  IProfileReducers
} from "../../../../utils/interfaces";
import ZoomablePicture from "../../../zoomablePicture";
import {
  IGoodsData,
  IProfile,
  IOrderElement
} from "../../../modals/basketModal";
import { setOrders, setOpenBasketModal } from "../../../../store/actions";
import { buyButtonHandler } from "../../../../utils/handlers";
import {
  ButtonBuy,
  InfoContainer,
  MainContainer,
  ControlsContainer,
  PriceContainer,
  Controls,
  ParametrsContainer,
  PictureProduct
} from "./components";

interface IProps {
  changedProduct: IGoodsData;
}

const ItemsDetailsContainer = (props: IProps) => {
  const { changedProduct } = props;
  const {
    goodId,
    goodName,
    isSale,
    pictureUrl,
    price,
    parametrs
  } = changedProduct;
  const { color, internalMem, ram, sizeScreen, weight } = parametrs;
  const dispatch = useDispatch();
  const orders = useSelector<IOrdersReducers, IOrderElement[]>(
    state => state.orders
  );
  const profile = useSelector<IProfileReducers, IProfile>(
    state => state.profile
  );

  return (
    <MainContainer>
      <InfoContainer>
        <h3>{goodName}</h3>
        <p>Код товара: {goodId}</p>
      </InfoContainer>
      <ControlsContainer>
        <PictureProduct>
          <ZoomablePicture url={pictureUrl} />
        </PictureProduct>
        <Controls>
          <PriceContainer>{price} $</PriceContainer>
          {isSale && <p>SALE</p>}
          <ButtonBuy
            onClick={() => {
              buyButtonHandler({
                orders,
                singleGood: changedProduct,
                profile,
                setOrders,
                setOpenBasketModal: status =>
                  dispatch(setOpenBasketModal(status))
              });
            }}
          >
            Купить
          </ButtonBuy>
          <ParametrsContainer>
            <h2>Характеристики:</h2>
            <li>Цвет: {color}</li>
            <li>Внутреняя память: {internalMem} ГБ</li>
            <li>Оперативная память: {ram} ГБ</li>
            <li>Диагональ экрана: {sizeScreen}``</li>
            <li>Вес: {weight} гр.</li>
          </ParametrsContainer>
        </Controls>
      </ControlsContainer>
    </MainContainer>
  );
};
export default ItemsDetailsContainer;
