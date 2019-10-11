import { combineReducers } from "redux";
import types from "./types";

const goodsReducers = (
  state = {
    sortType: "list",
    goods: []
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
    default:
      return state;
  }
};

export const reducers = combineReducers({
  goodsReducers
});
