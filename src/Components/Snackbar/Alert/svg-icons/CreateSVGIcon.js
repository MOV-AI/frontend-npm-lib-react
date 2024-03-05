import React from "react";

const CreateSVGIcon = ({
  path = "",
  style = {},
  fill = "#fff",
  width = "100%",
  height = "100%",
  className = "",
  viewBox = "0 0 24 24"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path fill={fill} d={path} />
  </svg>
);

export default CreateSVGIcon;
