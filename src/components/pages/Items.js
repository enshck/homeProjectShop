import React from "react";
import styled from "styled-components";

import firebase from "../../utils/firebase";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemsContainer = styled.div`
  width: 80%;
  height: 80%;
  background: #d9dee1;
`;

const Header = styled.div`
  border-bottom: 1px solid #cdd2d5;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const SignOutButton = styled.div`
  background: #3b3e47;
  color: #fff;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`;

const Items = props => {
  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <MainContainer>
      <ItemsContainer>
        <Header>
          <p>header</p>
          <SignOutButton onClick={signOutHandler}>SignOut</SignOutButton>
        </Header>
      </ItemsContainer>
    </MainContainer>
  );
};

export default Items;
