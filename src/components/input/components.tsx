import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  ${({ type }: { type: string }) =>
    type === "file" &&
    css`
      justify-content: center;
      align-items: center;
    `};
`;

export const FancyInput = styled.input`
  width: 100%;
  font-size: 14px;
  color: #444;
  background: #fff;
  border: 1px solid #707070;
  padding: 6px 8px 6px;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 5px;

  ${({ warning }: { warning: boolean }) =>
    warning &&
    css`
      border-color: red;
    `}
  ${({ type, warning }: { type: string; warning: boolean }) =>
    type === "file" &&
    css`
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    `};
  ${({ type, warning }: { type: string; warning: boolean }) =>
    type === "checkbox" &&
    css`
      padding: 20px;
      background: #eee;
    `};
`;

export const Label = styled.label`
  color: #000;
  p {
    margin: 0;
  }
  ${({ type, warning }: { type: string; warning: boolean }) =>
    type === "file" &&
    css`
      font-size: 20px;
      font-weight: 500;
      color: #000;
      background-color: transparent;
      cursor: pointer;
      border: 1px solid grey;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 250px;
      height: 250px;
      overflow: hidden;
      ${warning &&
        css`
          border-color: red;
        `}
      img {
        max-width: 100%;
        max-height: 100%;
      }
    `};
`;

export const ErrorMessage = styled.div`
  color: red;
`;
