import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { colors } from "../../utils/constants";

const MainContainer = styled.div`
  width: 100%;
`;

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
  position: relative;
  ${({ warning }: { warning: boolean }) =>
    warning &&
    css`
      border-color: red;
    `}
`;

const ColorsContainer = styled.div`
  position: absolute;
  visibility: hidden;
  display: flex;
  width: 0;
  justify-content: space-between;
  z-index: 1000;
  background: #f6f2ef;
  transition: 0.5s;
  ${({ isOpen }: { isOpen: boolean }) =>
    isOpen &&
    css`
      width: 500px;
      padding: 30px;
      visibility: visible;
    `}
`;

const ColorElement = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 5px;

  ${({ changed }: { changed: boolean }) =>
    changed &&
    css`
      border: 2px solid red;
    `}
`;

const ColorPicker = ({
  onInput,
  value,
  warning
}: {
  onInput: (e: any) => void;
  value: string;
  warning: boolean;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const node = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e: any) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  console.log(value);

  const onChangedColor = (value: string) => {
    Object.entries(colors).map(elem => {
      if (elem[1] === value) {
        onInput({
          target: {
            value: elem[0]
          }
        });
      }
    });
  };

  return (
    <MainContainer ref={node}>
      <ColorsContainer isOpen={isOpen}>
        {Object.values(colors).map((elem, key) => (
          <ColorElement
            key={key}
            style={{ background: elem }}
            changed={elem === colors[value]}
            onClick={() => onChangedColor(elem)}
          />
        ))}
      </ColorsContainer>
      <Input warning={warning} onClick={() => setOpen(true)} />
    </MainContainer>
  );
};

export default ColorPicker;
