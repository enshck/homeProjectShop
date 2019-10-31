import firebase from "./firebase";
import {
  IOrderElement,
  IGoodsData,
  IProfile
} from "../components/modals/basketModal";

import { ISuccessOrders } from "../components/pages/adminPanel/ordersContainer";

export const signOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(res => {})
    .catch(error => {
      console.log(error);
    });
};

export const getOrders = (
  userId: string,
  setOrdersHandler: (data: any) => void,
  setFetching?: (status: boolean) => void
) => {
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

export const getSuccessOrders = async ({
  handler
}: {
  handler: (data: ISuccessOrders[]) => void;
}) => {
  const collection = await firebase
    .firestore()
    .collection("successOrders")
    .get();
  const data: any = collection.docs.map(elem => elem.data());
  handler(data);
};

export const buyButtonHandler = ({
  orders,
  singleGood,
  profile,
  setOrders,
  setOpenBasketModal
}: {
  orders: IOrderElement[];
  singleGood: IGoodsData;
  profile: IProfile;
  setOrders: (orders: IOrderElement[]) => void;
  setOpenBasketModal: (status: boolean) => void;
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
