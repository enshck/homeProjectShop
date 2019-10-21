import React from "react";
import styled from "styled-components";

const SpinnerMainContainer = styled.div`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  width: 80px;
  height: 80px;

  border: 2px solid #f3f3f3;
  border-top: 3px solid #f25a41;
  border-radius: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  animation: spin 1s infinite linear;
`;

const Spinner = props => <SpinnerMainContainer />;

export default Spinner;