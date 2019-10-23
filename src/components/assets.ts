import styled, { css } from "styled-components";

interface IProps {
  active?: boolean;
  sortButton?: boolean;
  signOut?: boolean;
  basket?: boolean;
}

export const HeaderButton = styled.div`
  background: #3b3e47;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
    ${({ active }: IProps) =>
      active &&
      css`
        background: #d9b176;
      `}
    ${({ sortButton }: IProps) =>
      sortButton &&
      css`
        width: 30px;
        height: 30px;
        margin-left: 10px;
        img {
          width: 20px;
          height: 20px;
        }
      `}
    ${({ signOut }: IProps) =>
      signOut &&
      css`
        padding: 5px;
      `}
    ${({ basket }: IProps) =>
      basket &&
      css`
        width: 30px;
        height: 30px;

        img {
          width: 30px;
          height: 30px;
        }
      `};
`;
