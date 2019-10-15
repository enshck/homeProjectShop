import { useState } from "react";

import firebase from "../utils/firebase";

export const useGetFirebaseData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [called, setCalled] = useState(false);
  const [error, setError] = useState(false);

  const handeleCall = async (attribute = {}) => {
    const { collection, singleDoc, actionHandler } = attribute;

    setCalled(true);
    setLoading(true);
    setError(false);

    try {
      if (collection) {
        if (singleDoc) {
          const doc = await firebase
            .firestore()
            .collection(collection)
            .doc(singleDoc)
            .get();

          const docData = doc.data();

          setData(await docData);
          actionHandler && actionHandler(await docData);
        } else {
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
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return [handeleCall, { data, loading, called, error }];
};
