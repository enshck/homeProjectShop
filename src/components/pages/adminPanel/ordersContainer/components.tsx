import styled, { css } from "styled-components";

export const MainContainer = styled.table`
  width: 100%;
`;

export const TableHeader = styled.thead`
  background: #fff;
  color: #7e756c;
  td {
    padding: 10px;
    text-align: center;
  }
`;

export const TableBody = styled.tbody`
  & td {
    padding: 20px 0px;
    text-align: center;
  }
  & tr {
    cursor: pointer;
    background: #f2f2f2;
  }
`;

export const StatusTD = styled.td`
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
