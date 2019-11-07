import React, { useRef, useEffect } from "react";
import styled, { css } from "styled-components";

import { StatusContainer } from "./assets";
import { orderStatus } from "../../utils/constants";

const MainContainer = styled.div`
  position: relative;
`;

const OptionsContainer = styled.div`
  z-index: 1000;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #eaeef2;
  top: 45px;
  left: -10px;
  border-radius: 10px;
  height: 0;
  padding: 0 10px;
  transition: 0.5s;
  overflow: hidden;
  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    css`
      height: 150px;
      padding: 10px;
    `};
`;

interface IProps {
  status: string;
  onSelect: (elem: string) => void;
  isOpen: boolean;
  setOpen: (status: boolean) => void;
}

const OrderStatusSelector = (props: IProps) => {
  const { status, onSelect, isOpen, setOpen } = props;
  const optionValues = Object.keys(orderStatus).filter(elem => elem !== status);
  const node = useRef<any>(null);

  const handleClick = (e: any) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const openHandler = () => {
    setOpen(true);
  };

  return (
    <MainContainer ref={node}>
      <StatusContainer typeContainer={status} onClick={openHandler}>
        {orderStatus[status]}
      </StatusContainer>
      <OptionsContainer isOpen={isOpen}>
        {optionValues.map((elem, key) => (
          <StatusContainer
            typeContainer={elem}
            onClick={() => onSelect(elem)}
            key={key}
          >
            {orderStatus[elem]}
          </StatusContainer>
        ))}
      </OptionsContainer>
    </MainContainer>
  );
};

export default OrderStatusSelector;
