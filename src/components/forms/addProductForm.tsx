import React from "react";
import styled from "styled-components";

import Input from "../input";
import { IGoodsDataValidation } from "../pages/adminPanel/updateGoodsContainer";
import PricePicker from "../assets/PricePicker";
import ColorPicker from "../assets/ColorPicker";
import { IErrorsObject } from "../../utils/interfaces";

const Form = styled.form`
  width: 30%;
`;

const SumbitButton = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px;
  background: #279240;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface IProps {
  onChangePicture: (e: any) => void;
  formData: IGoodsDataValidation;
  setData: (data: IGoodsDataValidation) => void;
  submitHandler: () => void;
  errors: IErrorsObject;
}

const AddProductForm = (props: IProps) => {
  const { onChangePicture, formData, setData, submitHandler, errors } = props;
  return (
    <Form>
      <Input
        onChange={onChangePicture}
        type={"file"}
        accept={"image/*"}
        id={"pictureUrl"}
        title={"Картинка для товара"}
        file={formData.pictureUrl}
        errors={errors}
      />
      <Input
        id={"goodName"}
        type={"text"}
        title={"Название товара:"}
        value={formData.goodName}
        onInput={e =>
          setData({
            ...formData,
            goodName: e.target.value
          })
        }
        errors={errors}
      />
      <Input
        id={"price"}
        type={"text"}
        title={"Цена:"}
        CustomInput={PricePicker}
        value={formData.price}
        onInput={e => {
          setData({
            ...formData,
            price: e.target.value
          });
        }}
        errors={errors}
      />
      <Input
        id={"color"}
        type={"text"}
        title={"Цвет:"}
        CustomInput={ColorPicker}
        value={formData.parametrs.color}
        onInput={e =>
          setData({
            ...formData,
            parametrs: {
              ...formData.parametrs,
              color: e.target.value
            }
          })
        }
        errors={errors}
      />
      <Input
        id={"internalMem"}
        type={"number"}
        title={"Обьем внутреней памяти:"}
        value={formData.parametrs.internalMem}
        min={1}
        max={99999}
        onInput={e =>
          setData({
            ...formData,
            parametrs: {
              ...formData.parametrs,
              internalMem: e.target.value.slice(0, 5)
            }
          })
        }
        errors={errors}
      />
      <Input
        id={"ram"}
        type={"number"}
        value={formData.parametrs.ram}
        min={1}
        max={99999}
        title={"Обьем оперативной памяти:"}
        onInput={e =>
          setData({
            ...formData,
            parametrs: {
              ...formData.parametrs,
              ram: e.target.value.slice(0, 5)
            }
          })
        }
        errors={errors}
      />
      <Input
        id={"sizeScreen"}
        type={"number"}
        title={"Екран:"}
        min={1}
        max={999}
        value={formData.parametrs.sizeScreen}
        onInput={e =>
          setData({
            ...formData,
            parametrs: {
              ...formData.parametrs,
              sizeScreen: e.target.value.slice(0, 3)
            }
          })
        }
        errors={errors}
      />
      <Input
        id={"weight"}
        type={"number"}
        title={"Вес:"}
        min={1}
        max={999}
        value={formData.parametrs.weight}
        onInput={e =>
          setData({
            ...formData,
            parametrs: {
              ...formData.parametrs,
              weight: e.target.value.slice(0, 3)
            }
          })
        }
        errors={errors}
      />
      <SumbitButton onClick={submitHandler}>Создать товар</SumbitButton>
    </Form>
  );
};

export default AddProductForm;
