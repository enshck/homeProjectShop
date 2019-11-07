import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { orderStatus } from "../../../../utils/constants";
import { StatusContainer } from "../../../assets/assets";
import { IAdminOrdersReducers } from "../../../../utils/interfaces";
import OrderModal from "../../../modals/orderModal";
import { IOrderElement } from "../../../modals/basketModal";
import { MainContainer, TableBody, TableHeader, StatusTD } from "./components";

export interface ISuccessOrders {
  orders: IOrderElement[];
  status: string;
  userName: string;
  summaryOrder: number;
  date: any;
  id: string;
}

const OrdersContainer = () => {
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);
  const [sortedList, setSortedList] = useState<ISuccessOrders[]>([]);
  const [changedOrder, setChangedOrder] = useState<ISuccessOrders>({
    date: "",
    orders: [],
    status: "",
    summaryOrder: 0,
    userName: "",
    id: ""
  });
  const adminOrders = useSelector<IAdminOrdersReducers, ISuccessOrders[]>(
    state => state.adminOrders
  );

  const modalElement = document.getElementById("modal");

  useEffect(() => {
    const newChangedOrder = sortedList.find(elem => elem.id === detailOrderId);
    newChangedOrder && setChangedOrder(newChangedOrder);
  }, [detailOrderId, sortedList]);

  useEffect(() => {
    const sortPattern = ["ordered", "paidFor", "cancelled", "delivered"];
    const newAdminOrdersList: ISuccessOrders[] = [];
    sortPattern.forEach(elem => {
      adminOrders.forEach(order => {
        if (order.status === elem) {
          newAdminOrdersList.push(order);
        }
      });
    });
    setSortedList(newAdminOrdersList);
  }, [adminOrders]);

  return (
    <MainContainer>
      {modalElement &&
        ReactDOM.createPortal(
          <OrderModal
            setDetailOrderId={setDetailOrderId}
            isOpenModal={Boolean(detailOrderId)}
            changedOrder={changedOrder}
          />,
          modalElement
        )}
      <TableHeader>
        <tr>
          <td>Создан:</td>
          <td>Сумма:</td>
          <td>Заказчик:</td>
          <td>Статус:</td>
        </tr>
      </TableHeader>
      <TableBody>
        {sortedList.map((elem: ISuccessOrders, index: number) => {
          const { status, date, summaryOrder, userName, id } = elem;

          return (
            <tr onClick={() => setDetailOrderId(id)} key={index}>
              <StatusTD typeContainer={status}>
                {moment(date).format("YYYY-MM-DD")}
              </StatusTD>
              <td>{summaryOrder} $</td>
              <td>{userName}</td>
              <td>
                <StatusContainer typeContainer={status}>
                  {orderStatus[status]}
                </StatusContainer>
              </td>
            </tr>
          );
        })}
      </TableBody>
    </MainContainer>
  );
};

export default OrdersContainer;
