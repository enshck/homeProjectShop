import { IGoodsData, IOrderElement } from "../components/modals/basketModal";
import { ISuccessOrders } from "../components/pages/adminPanel/ordersContainer";

export interface IGoodsReducers {
  goods: IGoodsData[];
}

export interface ISortTypeReducers {
  sortType: string;
}

export interface IOrdersReducers {
  orders: IOrderElement[];
}

export interface IAdminOrdersReducers {
  adminOrders: ISuccessOrders[];
}

export interface IIsOpenBasketModalReducers {
  isOpenBasketModal: boolean;
}

export interface IErrorsObject {
  [key: string]: string;
}
