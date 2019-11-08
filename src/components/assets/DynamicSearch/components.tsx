import styled, { css } from "styled-components";

import { DetailsButton as Link } from "../../pages/items/goodsContainer/components";

export const MainContainer = styled.div`
  position: relative;
`;

export const ResultContainer = styled.div`
  position: absolute;
  background: #f2f2f2;
  z-index: 800;
  overflow: auto;
  max-height: 300px;
  width: 100%;
  padding: 10px;
  border: 1px solid #d2d2d2;
`;

export const Input = styled.input`
  border: 1px solid #d2d2d2;
  padding: 5px;
  border-radius: 5px;
  outline: none;
`;

export const NonResultMessage = styled.p`
  font-size: 12px;
`;

export const WarningMessage = styled.p`
  font-size: 12px;
  color: red;
`;

export const ResultElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  margin-top: 5px;
  padding: 10px;
  cursor: pointer;
  position: relative;
  img {
    width: 80px;
    min-height: 80px;
    max-height: 120px;
  }
  ${({ isInExcludeList }: { isInExcludeList: boolean }) =>
    isInExcludeList &&
    css`
      opacity: 0.5;
    `}
`;

export const DetailsButton = styled(Link)`
  font-size: 14px;
`;
