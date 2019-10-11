import types from "./types";

export const setSortGoods = sortType => ({
  type: types.SET_SORT_GOODS,
  sortType
});

export const setGoodsList = goodsList => ({
  type: types.SET_GOODS_LIST,
  goodsList
});

// export const setError = error => ({ type: types.SET_ERROR, payload: error });
//action creators
