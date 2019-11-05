import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";

import { orderStatus } from "../../../utils/constants";
import { StatusContainer } from "../../assets/assets";
import { IAdminOrdersReducers } from "../../../utils/interfaces";
import OrderModal from "../../modals/orderModal";
import { IOrderElement } from "../../modals/basketModal";

const MainContainer = styled.table`
  width: 100%;
`;

const TableHeader = styled.thead`
  background: #fff;
  color: #7e756c;
  td {
    padding: 10px;
  }
`;

const TableBody = styled.tbody`
  & td {
    padding: 20px 0px;
  }
  & tr {
    cursor: pointer;
    &:nth-of-type(even) {
      background: #fff;
    }
    &:nth-of-type(odd) {
      background: #f2f2f2;
    }
  }
`;

const StatusTD = styled.td`
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "ordered" &&
    css`
      border-left: 5px solid #3d9ec8;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "cancelled" &&
    css`
      border-left: 5px solid #da5f57;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "delivered" &&
    css`
      border-left: 5px solid #279240;
    `};
  ${({ typeContainer }: { typeContainer: String }) =>
    typeContainer === "paidFor" &&
    css`
      border-left: 5px solid #86a760;
    `};
`;

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
            detailOrderId={detailOrderId}
            adminOrders={adminOrders}
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
