import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import firebase from "../../utils/firebase";
import SignUpForm from "../forms/auth_sign";
import { errors } from "../../utils/errors";

const MainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const SignUp = props => {
  const { history, type } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: null
  });

  const signUpHandler = () => {
    const { email, password } = formData;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user && history.push("/items");
      })
      .catch(err => {
        const error = errors[err.code];

        if (error) {
          setFormData({
            ...formData,
            error
          });
        }
      });
  };

  const authHandler = () => {
    const { email, password } = formData;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        user && history.push("/items");
      })
      .catch(err => {
        const error = errors[err.code];

        if (error) {
          setFormData({
            ...formData,
            error
          });
        }
      });
  };

  return (
    <MainContainer>
      {type === "auth" ? (
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          signUpHandler={authHandler}
          submitButtonText={"Авторизоватся"}
          titleForm={"Авторизация"}
          type={type}
        />
      ) : (
        <SignUpForm
          formData={formData}
          setFormData={setFormData}
          signUpHandler={signUpHandler}
          submitButtonText={"Зарегистрироватся"}
          titleForm={"Регистрация"}
          type={type}
        />
      )}
    </MainContainer>
  );
};

export default withRouter(SignUp);
