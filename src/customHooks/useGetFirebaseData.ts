import { useState } from "react";

import firebase from "../utils/firebase";

interface IUseFirebaseDataProps {
  collection: string;
  singleDoc?: string;
  actionHandler?: (data: any) => void;
}

export const useGetFirebaseData = (): [
  (data: IUseFirebaseDataProps) => void,
  {
    data: any;
    loading: boolean;
    called: boolean;
    error: any;
    setCalled: (status: boolean) => void;
  }
] => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handeleCall = async (
    attribute: IUseFirebaseDataProps = {
      collection: "",
      singleDoc: "",
      actionHandler: () => {}
    }
  ) => {
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

  return [handeleCall, { data, loading, called, error, setCalled }];
};
