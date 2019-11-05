import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import { IGoodsData, IOrderElement } from "../modals/basketModal";
import { IGoodsReducers } from "../../utils/interfaces";

const MainContainer = styled.div`
  position: relative;
`;

const ResultContainer = styled.div`
  position: absolute;
  background: #f2f2f2;
  z-index: 1000;
  overflow: auto;
  max-height: 300px;
  width: 100%;
  padding: 10px;
  border: 1px solid #d2d2d2;
`;

const Input = styled.input`
  border: 1px solid #d2d2d2;
  padding: 5px;
  border-radius: 5px;
  outline: none;
`;

const ResultElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  margin-top: 5px;
  padding: 10px;
  cursor: pointer;
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

const NonResultMessage = styled.p`
  font-size: 12px;
`;

const WarningMessage = styled.p`
  font-size: 12px;
  color: red;
`;

const DynamicSearch = ({
  onChangeHandler,
  orders
}: {
  onChangeHandler: (data: IGoodsData) => void;
  orders: IOrderElement[];
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [resultsList, setResultList] = useState<IGoodsData[] | null>(null);
  const [excludeIds, setExcludeIds] = useState<string[]>([]);
  const goodsData = useSelector<IGoodsReducers, IGoodsData[]>(
    state => state.goods
  );
  const node = useRef<any>(null);

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredList = goodsData.filter(
        elem =>
          elem.goodId.includes(searchValue) ||
          elem.goodName.includes(searchValue)
      );

      setResultList(filteredList);
    }
  }, [searchValue]);

  useEffect(() => {
    const excludeIds = orders.map(elem => elem.goodsData.goodId);

    setExcludeIds(excludeIds);
  }, [orders]);

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
    setResultList(null);
    setSearchValue("");
  };

  return (
    <MainContainer ref={node}>
      <Input
        type={"text"}
        onInput={(e: any) => {
          setSearchValue(e.target.value);
        }}
        placeholder={"Название товара или ID"}
        onClick={(e: any) => setSearchValue(e.target.value)}
      />
      {resultsList && (
        <ResultContainer>
          {resultsList.length < 1 && searchValue.length > 0 ? (
            <NonResultMessage>Результаты отсутсвуют</NonResultMessage>
          ) : (
            resultsList.map(elem => {
              const { goodName, pictureUrl, goodId } = elem;
              const isInExcludeList = excludeIds.includes(goodId);

              return (
                <ResultElement
                  key={goodId}
                  onClick={() => !isInExcludeList && onChangeHandler(elem)}
                  isInExcludeList={isInExcludeList}
                >
                  <img src={pictureUrl} alt={"product"} />
                  <p>{goodName}</p>
                  {isInExcludeList && (
                    <WarningMessage> Уже в списке заказов</WarningMessage>
                  )}
                </ResultElement>
              );
            })
          )}
        </ResultContainer>
      )}
    </MainContainer>
  );
};

export default DynamicSearch;
