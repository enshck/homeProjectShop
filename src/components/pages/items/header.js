import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import gridImg from "../../../img/grid.png";
import listImg from "../../../img/list.png";
import { setSortGoods } from "../../../store/actions";
import { HeaderButton } from "../../assets";

const MainContainer = styled.div`
  border-bottom: 1px solid #cdd2d5;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  top: 0;
`;
const SortContainer = styled.div`
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-between;
`;

const Header = props => {
  const { signOutHandler, sortType, setTypeSort } = props;

  return (
    <MainContainer>
      <h3>Товары:</h3>
      <SortContainer>
        <HeaderButton
          sortButton
          active={sortType === "grid"}
          onClick={() => setTypeSort("grid")}
        >
          <img src={gridImg} alt={"grid"} />
        </HeaderButton>

        <HeaderButton
          sortButton
          active={sortType === "list"}
          onClick={() => setTypeSort("list")}
        >
          <img src={listImg} alt={"list"} />
        </HeaderButton>
        <HeaderButton signOut onClick={signOutHandler}>
          Выйти
        </HeaderButton>
      </SortContainer>
    </MainContainer>
  );
};

const mapStateToProps = state => {
  const { sortType } = state.goodsReducers;

  return {
    sortType
  };
};

const mapDispatchToProps = dispatch => ({
  setTypeSort: sortType => dispatch(setSortGoods(sortType))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
