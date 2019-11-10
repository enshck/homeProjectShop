import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setProfileData,
  setIsAdminStatus,
  setIsAuthStatus
} from "../store/actions";
import { GlobalStyleComponent } from "./assets/assets";

import Spinner from "./spinner";
import firebase from "../utils/firebase";

interface IProps {
  children: any;
}

const WrapComponent = (props: IProps) => {
  const [isFetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetching(true);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setIsAuthStatus(true));
        dispatch(setProfileData(user));
        firebase
          .firestore()
          .collection("successOrders")
          .get()
          .then(() => {
            dispatch(setIsAdminStatus(true));
            setFetching(false);
          })
          .catch(() => {
            dispatch(setIsAdminStatus(false));
            setFetching(false);
          });
      } else {
        dispatch(setIsAuthStatus(false));
        dispatch(setProfileData({}));
        setFetching(false);
      }
    });
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return <GlobalStyleComponent>{props.children}</GlobalStyleComponent>;
};

export default WrapComponent;
