import React, { useState } from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

import firebase, {
  authGoogleProvider,
  authFacebookProvider
} from "../../utils/firebase";
import google from "../../img/google.png";
import facebookIcon from "../../img/facebook.png";
import { errors } from "../../utils/errors";

const FormMainContainer = styled.div`
  background: #fff;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
`;

const SubmitButton = styled.div`
  width: 100%;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 700;
  text-transform: uppercase;
  height: 48px;
  background-color: #4680fe;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-family: "Roboto", sans-serif;
  border-radius: 3px;
  margin-top: 30px;
  cursor: pointer;
`;

const SignUpInput = styled.input`
  width: 100%;
  font-size: 14px;
  color: #444;
  background: #fff;
  border: 1px solid #707070;
  padding: 12px 12px 10px;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 5px;

  ${props =>
    props.active &&
    css`
      border-color: #4680fe;
    `}
`;

const ErrorMessage = styled.h3`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #e8e8e8;
  height: 60px;
  padding: 0;
  display: flex;
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-transition: border-color, background-color 0.2s ease-out;
  -o-transition: border-color, background-color 0.2s ease-out;
  transition: border-color, background-color 0.2s ease-out;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  margin-bottom: -1px;
  position: relative;
  font-weight: 500;
  font-size: 14px;
  color: grey;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlsContainer = styled.div`
  padding: 40px 60px 50px;
  position: relative;
`;

const InputContainer = styled.div`
  margin-top: 30px;
  label {
    font-weight: 600;
    font-size: 14px;
    color: grey;
  }
`;

const Social = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  justify-content: space-around;
  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const SignUpForm = props => {
  const { formData, setFormData, signUpHandler, type } = props;
  const [activeInput, setActiveInput] = useState(null);

  const onBlur = (e, typeInput) => {
    setFormData({
      ...formData,
      ...{ [typeInput]: e.target.value }
    });
    setActiveInput(null);
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
