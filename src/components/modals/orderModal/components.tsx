import styled, { css } from "styled-components";

export const MainModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 900;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  transition: 0.5s;
  & ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }
  & ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: grey;
  }

  ${({ isOpenModal }: { isOpenModal: boolean }) =>
    isOpenModal &&
    css`
      visibility: visible;
    `};
`;

export const ModalContent = styled.div`
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  padding: 16px 24px 100px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 80%;
  height: 0;
  max-width: 980px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
  overflow: hidden;

  ${({ isOpenModal }: { isOpenModal: boolean }) =>
    isOpenModal &&
    css`
      height: 80vh;
    `};
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 0px;
  right: 5px;
  cursor: pointer;
`;

export const InfoContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  list-style: none;
  width: 100%;
`;

export const ListElement = styled.li`
  display: flex;
  justify-content: center;
`;

export const OrdersContainer = styled.div`
  overflow: auto;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  padding: 20px;
`;

export const OrderElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  margin-top: 15px;
  padding: 15px;
  width: 60%;
  position: relative;
  img {
    max-width: 300px;
  }
  h3 {
    margin: 0;
  }
`;

export const CodeOrderElement = styled.p`
  padding: 5px 10px;
  font-size: 14px;
  color: #999;
  background-color: #fef2b8;
  border-radius: 5px;
`;

export const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
`;

export const ControlButtons = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ControlInput = styled.input`
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  transition: border-color 0.3s linear;
  width: 68px;
  height: 28px;
  line-height: 28px;
  margin: 0 9px;
  padding: 5px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  font-size: 15px;
  resize: none;
  caret-color: #00a046;
  color: #4d4b4b;
  outline: none;
  ${({ warning }: { warning?: boolean }) =>
    warning &&
    css`
      border-color: red;
    `}
`;

export const DeleteIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 10px;
  top: 10px;
  cursor: pointer;
`;

export const ContolsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
