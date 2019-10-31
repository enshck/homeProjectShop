import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../store";
import Routes from "./Routes";
import "./style.css";
import firebase from "../utils/firebase";

const App = () => {
  const [authStatus, setAuthStatus] = useState<string>("");
  const [userData, setUserData] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthStatus("autorize");
        setUserData(user);
        firebase
          .firestore()
          .collection("successOrders")
          .get()
          .then(() => {
            setRole("admin");
          })
          .catch(() => {
            setRole("user");
          });
      } else {
        setAuthStatus("unautorize");
        setUserData(null);
      }
    });
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes authStatus={authStatus} profile={userData} role={role} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
