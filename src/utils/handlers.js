import firebase from "./firebase";

export const signOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {})
    .catch(error => {
      console.log(error);
    });
};

export const getOrders = (userId, setOrdersHandler, setFetching) => {
  firebase
    .firestore()
    .collection("orders")
    .doc(userId)
    .get()
    .then(elem => {
      setOrdersHandler(elem.data());
      setFetching && setFetching(false);
    });
};
