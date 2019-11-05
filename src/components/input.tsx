import React from "react";
import styled, { css } from "styled-components";

import { IErrorsObject } from "../utils/interfaces";

const InputContainer = styled.div`
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

const FancyInput = styled.input`
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

const Label = styled.label`
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

const Input = ({
  onChange,
  onInput,
  type,
  accept,
  id,
  title,
  file,
  errors,
  value,
  CustomInput,
  maxlength,
  pattern
}: {
  onChange?: (e: any) => void;
  onInput?: (e: any) => void;
  type: string;
  accept?: string;
  id: string;
  title: string;
  file?: string;
  errors: IErrorsObject;
  value?: string;
  CustomInput?: any;
  maxlength?: number;
  pattern?: string;
}) => {
  return (
    <InputContainer type={type}>
      <Label htmlFor={id} type={type} warning={Boolean(errors[id])}>
        {type === "file" && file ? (
          <img src={file} alt={"file"} />
        ) : (
          <p>{title}</p>
        )}
      </Label>
      {CustomInput ? (
        <CustomInput
          type={type}
          onChange={onChange}
          accept={accept}
          id={id}
          onInput={onInput}
          warning={Boolean(errors[id])}
          value={value}
        />
      ) : (
        <FancyInput
          type={type}
          onChange={onChange}
          accept={accept}
          id={id}
          onInput={onInput}
          warning={Boolean(errors[id])}
          value={value}
          maxLength={maxlength}
          pattern={pattern}
        />
      )}
    </InputContainer>
  );
};

export default Input;
