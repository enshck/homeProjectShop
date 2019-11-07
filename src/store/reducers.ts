import { combineReducers } from "redux";
import types from "./types";

const goodsReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_GOODS_LIST: {
      return action.goodsList;
    }
    default:
      return state;
  }
};

const sortTypeReducers = (state = "list", action: any) => {
  switch (action.type) {
    case types.SET_SORT_GOODS: {
      return action.sortType;
    }
    default:
      return state;
  }
};

const ordersReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_ORDERS: {
      return action.orders.ordersData || [];
    }
    default:
      return state;
  }
};

const adminOrdersReducers = (state = [], action: any) => {
  switch (action.type) {
    case types.SET_ADMIN_ORDERS: {
      return action.adminOrders;
    }
    default:
      return state;
  }
};

const isOpenBasketModalReducers = (state = false, action: any) => {
  switch (action.type) {
    case types.SET_OPEN_MODAL_STATUS: {
      return action.isOpen;
    }
    default:
      return state;
  }
};

const profileReducers = (state = {}, action: any) => {
  switch (action.type) {
    case types.SET_PROFILE: {
      return action.profile;
    }
    default:
      return state;
  }
};

const isAdminReducers = (state = false, action: any) => {
  switch (action.type) {
    case types.SET_IS_ADMIN: {
      return action.isAdmin;
    }
    default:
      return state;
  }
};

const isAuthReducers = (state = false, action: any) => {
  switch (action.type) {
    case types.SET_IS_AUTH: {
      return action.isAuth;
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  goods: goodsReducers,
  sortType: sortTypeReducers,
  orders: ordersReducers,
  adminOrders: adminOrdersReducers,
  isOpenBasketModal: isOpenBasketModalReducers,
  profile: profileReducers,
  isAdmin: isAdminReducers,
  isAuth: isAuthReducers
});
