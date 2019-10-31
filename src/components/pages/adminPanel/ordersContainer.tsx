import React, { useState } from "react";
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
  id?: string;
}

const OrdersContainer = () => {
  const [detailOrderId, setDetailOrderId] = useState<number | null>(null);
  const adminOrders = useSelector<IAdminOrdersReducers, ISuccessOrders[]>(
    state => state.adminOrders
  );
  const modalElement = document.getElementById("modal");

  return (
    <MainContainer>
      {modalElement &&
        ReactDOM.createPortal(
          <OrderModal
            setDetailOrderId={setDetailOrderId}
            detailOrderId={detailOrderId}
            adminOrders={adminOrders}
            isOpenModal={Boolean(detailOrderId) || detailOrderId === 0}
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
        {adminOrders.map((elem: ISuccessOrders, index: number) => {
          const { status, date, summaryOrder, userName } = elem;

          return (
            <tr onClick={() => setDetailOrderId(index)} key={index}>
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
