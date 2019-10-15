import types from "./types";

export const setSortGoods = sortType => ({
  type: types.SET_SORT_GOODS,
  sortType
});

export const setGoodsList = goodsList => ({
  type: types.SET_GOODS_LIST,
  goodsList
});

export const setOrders = orders => ({
  type: types.SET_ORDERS,
  orders
});
