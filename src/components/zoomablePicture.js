import React, { useState } from "react";
import styled from "styled-components";

const IMG = styled.img`
  width: 100%;
  height: 100%;
`;

const ZoomablePicture = props => {
  const { url } = props;

  const [isHoverPicture, setStatusHoverPicture] = useState(false);
  const [xMouseCoordinate, setXMouseCoordinate] = useState(0);
  const [yMouseCoordinate, setYMouseCoordinate] = useState(0);

  const dynamicStyle = {
    transformOrigin: `${xMouseCoordinate}px ${yMouseCoordinate}px`,
    transform: "scale(2.5)"
  };
  const mouseInPicture = e => {
    setXMouseCoordinate(e.clientX - e.target.offsetLeft);
    setYMouseCoordinate(e.clientY - e.target.offsetTop);
    setStatusHoverPicture(true);
  };

  const mouseLeavePicture = e => {
    setStatusHoverPicture(false);
  };

  return (
    <IMG
      src={url}
      alt={"zoomable"}
      onMouseMove={mouseInPicture}
      onMouseLeave={mouseLeavePicture}
      style={isHoverPicture ? dynamicStyle : {}}
    />
  );
};

export default ZoomablePicture;
