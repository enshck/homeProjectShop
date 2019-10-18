import { combineReducers } from "redux";
import types from "./types";

const goodsReducers = (
  state = {
    sortType: "list",
    goods: [],
    orders: [],
    isOpenBasketModal: false
  },
  action
) => {
  switch (action.type) {
    case types.SET_SORT_GOODS: {
      return {
        ...state,
        ...{ sortType: action.sortType }
      };
    }
    case types.SET_GOODS_LIST: {
      return {
        ...state,
        ...{ goods: action.goodsList }
      };
    }
    case types.SET_ORDERS: {
      return {
        ...state,
        ...{ orders: action.orders.ordersData || [] }
      };
    }
    case types.SET_OPEN_MODAL_STATUS: {
      return {
        ...state,
        ...{ isOpenBasketModal: action.isOpen }
      };
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  goodsReducers
});
