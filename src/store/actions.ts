import types from "./types";
import { IOrderElement, IGoodsData } from "../components/modals/basketModal";
import { ISuccessOrders } from "../components/pages/adminPanel/ordersContainer";

export const setSortGoods = (sortType: string) => ({
  type: types.SET_SORT_GOODS,
  sortType
});

export const setGoodsList = (goodsList: IGoodsData[]) => ({
  type: types.SET_GOODS_LIST,
  goodsList
});

export const setOrders = (orders: IOrderElement[]) => ({
  type: types.SET_ORDERS,
  orders
});

export const setOpenBasketModal = (isOpen: boolean) => ({
  type: types.SET_OPEN_MODAL_STATUS,
  isOpen
});

export const setAdminOrders = (adminOrders: ISuccessOrders[]) => ({
  type: types.SET_ADMIN_ORDERS,
  adminOrders
});
