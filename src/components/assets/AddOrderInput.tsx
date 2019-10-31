import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { IGoodsData } from "../modals/basketModal";
import { IGoodsReducers } from "../../utils/interfaces";

const MainContainer = styled.div``;

const ResultContainer = styled.div``;

const Input = styled.input`
  border: 1px solid #d2d2d2;
  padding: 5px;
  border-radius: 5px;
  outline: none;
`;

const AddOrderInput = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [resultsList, setResultList] = useState<IGoodsData[] | []>([]);
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

  console.log(resultsList);
  return (
    <MainContainer ref={node}>
      <Input
        type={"text"}
        onInput={(e: any) => {
          setSearchValue(e.target.value);
        }}
      />
      <ResultContainer>{}</ResultContainer>
    </MainContainer>
  );
};

export default AddOrderInput;
