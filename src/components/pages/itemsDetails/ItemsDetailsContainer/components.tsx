import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 0 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 400;
    font-size: 30px;
    color: #221f1f;
    margin: 0;
  }
  p {
    padding: 5px 10px;
    font-size: 14px;
    color: #999;
    background-color: #fef2b8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PictureProduct = styled.div`
  width: 35%;
  max-width: 450px;
  max-height: 600px;
  min-width: 200px;
  min-height: 300px;
  overflow: hidden;
  cursor: zoom-in;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 20px -16px rgba(0, 0, 0, 0.75);
`;

export const ControlsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 0;
  }
`;

export const PriceContainer = styled.div`
  background: #fef2b8;
  padding: 3px 10px;
  border: 1px solid transparent;
  border-radius: 3px;
  white-space: nowrap;
  text-align: center;
  font-size: 32px;
  border-radius: 5px;
`;

export const ButtonBuy = styled.div`
  padding: 8px 20px;
  font-size: 24px;
  background: #00a046;
  border-radius: 4px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
`;

export const ParametrsContainer = styled.ul`
  list-style: none;
`;
