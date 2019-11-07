import React from "react";

import { IErrorsObject } from "../../utils/interfaces";
import { InputContainer, ErrorMessage, Label, FancyInput } from "./components";

interface IProps {
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
  max?: number;
  min?: number;
}

const Input = (props: IProps) => {
  const {
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
    pattern,
    max,
    min
  } = props;
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
          max={max}
          min={min}
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
          max={max}
          min={min}
        />
      )}
      {errors[id] && <ErrorMessage>{errors[id]}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
