import React, { useState } from "react";
import styled from "styled-components";

const IMG = styled.img`
  width: 100%;
  height: 100%;
`;

interface IProps {
  url: string;
}

const ZoomablePicture = (props: IProps) => {
  const { url } = props;
  const [isHoverPicture, setStatusHoverPicture] = useState(false);
  const [xMouseCoordinate, setXMouseCoordinate] = useState(0);
  const [yMouseCoordinate, setYMouseCoordinate] = useState(0);

  const dynamicStyle = {
    transformOrigin: `${xMouseCoordinate}px ${yMouseCoordinate}px`,
    transform: "scale(2.5)"
  };
  const mouseInPicture = (e: any) => {
    setXMouseCoordinate(e.clientX - e.target.offsetLeft);
    setYMouseCoordinate(e.clientY - e.target.offsetTop);
    setStatusHoverPicture(true);
  };

  const mouseLeavePicture = (e: any) => {
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
