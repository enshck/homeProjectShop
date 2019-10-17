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

export const buyButtonHandler = ({
  orders,
  singleGood,
  profile,
  setOrders,
  setOpenBasketModal
}) => {
  const isCreated = orders.some(
    elem => elem.goodsData.goodId === singleGood.goodId
  );

  if (isCreated) {
    orders.forEach((elem, item) => {
      const { goodsData } = elem;
      if (goodsData.goodId === singleGood.goodId) {
        orders[item].count++;
      }
    });
  } else {
    orders.push({
      count: 1,
      goodsData: singleGood
    });
  }

  firebase
    .firestore()
    .collection("orders")
    .doc(profile.uid)
    .set({
      ordersData: orders
    })
    .then(result => {
      getOrders(profile.uid, setOrders);
      setOpenBasketModal(true);
    })
    .catch(err => console.log(err));
};
