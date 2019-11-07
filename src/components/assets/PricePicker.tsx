import React from "react";
import styled, { css } from "styled-components";

const MainContainer = styled.div``;

const Input = styled.input`
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
`;
interface IProps {
  onInput: (e: any) => void;
  value: string;
  warning: boolean;
}

const PricePicker = (props: IProps) => {
  const { onInput, value, warning } = props;
  const formatCurrency = (e: {
    target: {
      value: string;
    };
  }) => {
    let { value } = e.target;
    const splitPrice = value.match(`^[0-9]+(\.[0-9]{1,2})?$`);

    if (splitPrice && !splitPrice[1]) {
      value = value + ".00";
    }

    if (!splitPrice) {
      const splittedvalue = value.split(".");
      if (splittedvalue.length > 1) {
        value = `${splittedvalue[0]}.${splittedvalue[1].slice(0, 2)}`;
      }
    }
    onInput({
      target: {
        value
      }
    });
  };

  return (
    <MainContainer>
      <Input
        warning={warning}
        value={value}
        onInput={onInput}
        onBlur={formatCurrency}
        type={"number"}
      />
    </MainContainer>
  );
};

export default PricePicker;
