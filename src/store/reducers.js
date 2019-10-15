import { combineReducers } from "redux";
import types from "./types";

const goodsReducers = (
  state = {
    sortType: "list",
    goods: [],
    orders: []
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
        ...{ orders: action.orders.ordersData }
      };
    }
    default:
      return state;
  }
};

export const reducers = combineReducers({
  goodsReducers
});
