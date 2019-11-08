import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { colors } from "../../utils/constants";

const MainContainer = styled.div`
  width: 100%;
  position: relative;
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

const ChangedColorContainer = styled.div`
  width: 100%;
  height: 30px;
  content: "";
  border-radius: 5px;
  cursor: pointer;
`;

interface IProps {
  onInput: (e: any) => void;
  value: string;
}

const ColorPicker = (props: IProps) => {
  const { onInput, value } = props;
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
    setOpen(false);
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
      <ChangedColorContainer
        style={{ background: colors[value] }}
        onClick={() => setOpen(true)}
      />
    </MainContainer>
  );
};

export default ColorPicker;
