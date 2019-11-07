import React, { useState } from "react";

import firebase, {
  authGoogleProvider,
  authFacebookProvider
} from "../../../utils/firebase";
import google from "../../../img/google.png";
import facebookIcon from "../../../img/facebook.png";
import { errors } from "../../../utils/errors";
import {
  ControlsContainer,
  ErrorMessage,
  FormMainContainer,
  InputContainer,
  SignUpInput,
  Social,
  StyledNavLink,
  SubmitButton,
  TabContainer
} from "./components";

interface IFormData {
  email: string;
  password: string;
  phone: string;
  error: any;
}

interface IProps {
  formData: IFormData;
  setFormData: (formData: IFormData) => void;
  signUpHandler: () => void;
  type: string;
}

const SignUpForm = (props: IProps) => {
  const { formData, setFormData, signUpHandler, type } = props;
  const [activeInput, setActiveInput] = useState<string>("");

  const onBlur = (e: any, typeInput: string) => {
    setFormData({
      ...formData,
      ...{ [typeInput]: e.target.value }
    });
    setActiveInput("");
  };

  const facebookAutorizeHandler = () => {
    firebase
      .auth()
      .signInWithPopup(authFacebookProvider)
      .then(result => {})
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
    <FormMainContainer>
      <TabContainer>
        <StyledNavLink
          to={"/login"}
          activeStyle={{
            color: "#4680fe",
            borderBottom: "2px solid #4680fe"
          }}
        >
          <span>Войти</span>
        </StyledNavLink>
        <StyledNavLink
          to={"/signUp"}
          activeStyle={{
            color: "#4680fe",
            borderBottom: "2px solid #4680fe"
          }}
        >
          <span>Создать аккаунт</span>
        </StyledNavLink>
      </TabContainer>
      <ControlsContainer>
        <InputContainer>
          <label>Email:</label>
          <SignUpInput
            type={"text"}
            placeholder={"example@example.com"}
            onBlur={e => onBlur(e, "email")}
            onFocus={() => setActiveInput("email")}
            active={activeInput === "email"}
          />
        </InputContainer>
        <InputContainer>
          <label>Пароль:</label>
          <SignUpInput
            type={"password"}
            placeholder={"**********"}
            onBlur={e => onBlur(e, "password")}
            onFocus={() => setActiveInput("password")}
            active={activeInput === "password"}
          />
        </InputContainer>
        <SubmitButton onClick={signUpHandler}>
          {type === "auth" ? "Войти" : "Зарегистрироватся"}
        </SubmitButton>
        <Social>
          <img
            src={google}
            alt={"google"}
            onClick={() => firebase.auth().signInWithPopup(authGoogleProvider)}
          />
          <img
            src={facebookIcon}
            alt={"facebook"}
            onClick={facebookAutorizeHandler}
          />
        </Social>
      </ControlsContainer>
      {formData.error && <ErrorMessage>{formData.error}</ErrorMessage>}
    </FormMainContainer>
  );
};

export default SignUpForm;
