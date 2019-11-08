import styled, { css } from "styled-components";

export const MainModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 900;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.5);
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
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 0px;
  right: 5px;
  cursor: pointer;
`;

export const GoodsContainer = styled.div``;

export const SingleGoodsContainer = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 3px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
`;

export const ProductPicture = styled.img`
  width: 150px;
  height: 150px;
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

export const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    margin-top: 15px;
  }
`;

export const InfoContainer = styled.div`
  h2 {
    color: #3e77aa;
    font-size: 14px;
    line-height: 19px;
  }
  p {
    border: 1px solid transparent;
    border-radius: 4px;
    vertical-align: middle;
    white-space: nowrap;
    background: #fef2b8;
    padding: 7px 7px 5px;
    font-size: 18px;
    line-height: 18px;
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

export const SummaryOrder = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  background: #fef2b8;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 600;
  }
`;

export const ButtonSubmit = styled.div`
  color: #fff;
  display: inline-block;
  position: relative;
  border: 0;
  outline: 0;
  height: 44px;
  background: #00a046 !important;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  background: 0 0;
  cursor: pointer;
  z-index: 1;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
  transition: 0.1s;
  &:hover {
    background: #26af62;
  }
`;

export const DeleteIcon = styled.img`
  position: absolute;
  top: 10px;
  left: 5px;
  cursor: pointer;
`;

export const MainInfoContainer = styled.div`
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  h3 {
    font-size: 21px;
    line-height: 24px;
    font-weight: 400;
  }
  @media (max-width: 900px) {
    justify-content: center;
  }
`;

export const SucessOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  h2 {
    font-weight: 400;
  }
`;
