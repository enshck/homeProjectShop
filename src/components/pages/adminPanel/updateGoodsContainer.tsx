import React, { useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

import firebase from "../../../utils/firebase";
import AddProductForm from "../../forms/addProductForm";
import PopUpMessage from "../../modals/popUpMessage";
import { createProductValidation } from "../../../utils/handlers";

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
`;

export interface IGoodsDataValidation {
  goodId: string;
  goodName: string;
  isSale: boolean;
  id?: string;
  parametrs: {
    color: string;
    internalMem: string;
    ram: string;
    sizeScreen: string;
    weight: string;
  };
  pictureUrl: string;
  price: string;
}

const UpdateGoodsContainer = () => {
  const [statusPopup, setStatusPopUp] = useState<string | null>(null);
  const [errors, setErrors] = useState({});
  const [formData, setData] = useState<IGoodsDataValidation>({
    goodId: "",
    goodName: "",
    isSale: false,
    parametrs: {
      color: "black",
      internalMem: "",
      ram: "",
      sizeScreen: "",
      weight: ""
    },
    pictureUrl: "",
    price: ""
  });
  const modalElement = document.getElementById("modal");

  const onChangePicture = async (e: any) => {
    const storageRef = firebase.storage().ref();

    if (e.target.files[0]) {
      const uploadResult: any = await storageRef
        .child(e.target.files[0].name)
        .put(e.target.files[0]);

      const responseObject = await uploadResult.ref.getDownloadURL();

      setData({
        ...formData,
        pictureUrl: responseObject
      });
    }
  };

  const submitHandler = async () => {
    const errors = createProductValidation(formData);
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatusPopUp("warning");
      return;
    }

    try {
      const res = await firebase
        .firestore()
        .collection("goods")
        .add(formData);

      if (res.id) {
        await firebase
          .firestore()
          .collection("goods")
          .doc(res.id)
          .update({
            ...formData,
            goodId: res.id
          });
        setStatusPopUp("success");
        setData({
          goodId: "",
          goodName: "",
          isSale: false,
          parametrs: {
            color: "black",
            internalMem: "",
            ram: "",
            sizeScreen: "",
            weight: ""
          },
          pictureUrl: "",
          price: ""
        });
      }
    } catch (err) {
      setStatusPopUp("warning");
    }
  };

  return (
    <MainContainer>
      {modalElement &&
        ReactDOM.createPortal(
          <PopUpMessage
            statusPopup={statusPopup}
            setStatusPopUp={setStatusPopUp}
          />,
          modalElement
        )}
      <AddProductForm
        onChangePicture={onChangePicture}
        formData={formData}
        setData={setData}
        submitHandler={submitHandler}
        errors={errors}
      />
    </MainContainer>
  );
};

export default UpdateGoodsContainer;
