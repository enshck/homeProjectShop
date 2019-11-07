import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  position: absolute;
  visibility: hidden;
  bottom: 30px;
  transition: 0.5s;
  right: 0;
  width: 0;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  ${({ statusPopup }: { statusPopup: string | null }) =>
    statusPopup === "warning" &&
    css`
      width: 300px;
      visibility: visible;
      right: 30px;
      background: red;
      color: #fff;
      padding: 5px;
    `}
  ${({ statusPopup }: { statusPopup: string | null }) =>
    statusPopup === "success" &&
    css`
      width: 300px;
      visibility: visible;
      right: 30px;
      background: #279240;
      color: #fff;
      padding: 5px;
    `}
`;
