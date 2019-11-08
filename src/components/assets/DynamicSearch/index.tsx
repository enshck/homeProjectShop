import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";

import { IGoodsData, IOrderElement } from "../../modals/basketModal";
import { IGoodsReducers } from "../../../utils/interfaces";
import {
  Input,
  MainContainer,
  ResultContainer,
  ResultElement,
  NonResultMessage,
  WarningMessage,
  DetailsButton
} from "./components";

interface IProps {
  onChangeHandler?: (data: IGoodsData) => void;
  orders?: IOrderElement[];
}

const DynamicSearch = (props: IProps) => {
  const { onChangeHandler, orders } = props;
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
    if (orders) {
      const excludeIds = orders.map(elem => elem.goodsData.goodId);

      setExcludeIds(excludeIds);
    }
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
            <NonResultMessage>Результаты отсутствуют</NonResultMessage>
          ) : (
            resultsList.map(elem => {
              const { goodName, pictureUrl, goodId } = elem;
              const isInExcludeList = excludeIds.includes(goodId);

              return (
                <Fragment>
                  <ResultElement
                    key={goodId}
                    onClick={() => {
                      !isInExcludeList &&
                        onChangeHandler &&
                        onChangeHandler(elem);
                    }}
                    isInExcludeList={isInExcludeList}
                  >
                    <img src={pictureUrl} alt={"product"} />
                    <p>{goodName}</p>
                    <DetailsButton to={`/items/${goodId}`}>
                      Перейти к товару
                    </DetailsButton>
                    {isInExcludeList && (
                      <WarningMessage> Уже в списке заказов</WarningMessage>
                    )}
                  </ResultElement>
                </Fragment>
              );
            })
          )}
        </ResultContainer>
      )}
    </MainContainer>
  );
};

export default DynamicSearch;
