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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthStatus("autorize");
        setUserData(user);
      } else {
        setAuthStatus("unautorize");
        setUserData(null);
      }
    });
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes authStatus={authStatus} profile={userData} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
