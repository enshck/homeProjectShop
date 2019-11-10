import React, { useState } from "react";
import styled from "styled-components";

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
  background: #f6f8fb;
`;

interface IProps {
  history: {
    push: (path: string) => void;
  };
  type: string;
}

const SignUp = (props: IProps) => {
  const { history, type } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    error: ""
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
      <SignUpForm
        formData={formData}
        setFormData={setFormData}
        signUpHandler={type === "auth" ? authHandler : signUpHandler}
        type={type}
      />
    </MainContainer>
  );
};

export default SignUp;
