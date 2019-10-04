import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FormMainContainer = styled.div`
  background: #fff;
  width: 20%;
  height: 80vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SubmitButton = styled.div`
  background: green;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
`;

const SignUpInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  outline: none;
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.h3`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const SignUpForm = props => {
  const { formData, setFormData, signUpHandler, type } = props;

  const onBlur = (e, typeInput) => {
    setFormData({
      ...formData,
      ...{ [typeInput]: e.target.value }
    });
  };

  return (
    <FormMainContainer>
      <h2>{type === "auth" ? "Авторизация" : "Регистрация"}</h2>
      <SignUpInput
        type={"text"}
        placeholder={"Введите почту"}
        onBlur={e => onBlur(e, "email")}
      />
      <SignUpInput
        type={"password"}
        placeholder={"Введите пароль"}
        onBlur={e => onBlur(e, "password")}
      />
      <SubmitButton onClick={signUpHandler}>
        {type === "auth" ? "Войти" : "Зарегистрироватся"}
      </SubmitButton>
      {type === "auth" ? (
        <Link to={"/signUp"} style={{ marginTop: "10px" }}>
          Регистрация
        </Link>
      ) : (
        <Link to={"/login"} style={{ marginTop: "10px" }}>
          Авторизация
        </Link>
      )}
      {formData.error && <ErrorMessage>{formData.error}</ErrorMessage>}
    </FormMainContainer>
  );
};

export default SignUpForm;
