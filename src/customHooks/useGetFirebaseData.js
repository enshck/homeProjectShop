import { useState } from "react";

import firebase from "../utils/firebase";

export const useGetFirebaseData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(false);

  const handeleCall = async (attribute = {}) => {
    const { collection, actionHandler } = attribute;
    // console.log('USE EFFECT GO TO FIREBASE COLLECTION', collection);

    setCalled(true);
    setLoading(true);
    setError(false);

    try {
      if (collection) {
        const doc = await firebase
          .firestore()
          .collection(collection)
          .get();

        if (!doc.empty) {
          const docData = await doc.docs.map(item => item.data());
          setData(docData);
          actionHandler && actionHandler(docData);
        } else {
          setError(true);
        }
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // console.log(data, 'data');
  return [handeleCall, { data, loading, called, error }];
};
