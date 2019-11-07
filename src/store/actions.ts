import types from "./types";
import { IOrderElement, IGoodsData } from "../components/modals/basketModal";
import { ISuccessOrders } from "../components/pages/adminPanel/ordersContainer";
import { IProfileReducers } from "../utils/interfaces";

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

export const setProfileData = (profile: IProfileReducers | {}) => ({
  type: types.SET_PROFILE,
  profile
});

export const setIsAuthStatus = (isAuth: boolean) => ({
  type: types.SET_IS_AUTH,
  isAuth
});

export const setIsAdminStatus = (isAdmin: boolean) => ({
  type: types.SET_IS_ADMIN,
  isAdmin
});
