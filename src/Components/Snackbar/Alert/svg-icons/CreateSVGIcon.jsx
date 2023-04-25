// import * as React from "react";
// import SvgIcon from "@mui/icons-material/SvgIcon";

// export default function createSvgIcon({
//   path = "",
//   style = {},
//   fill = "#fff",
//   width = "100%",
//   className = "",
//   height = "100%",
//   viewBox = "0 0 32 32"
// }) {
//   return (
//     <svg
//       width={width}
//       style={style}
//       height={height}
//       viewBox={viewBox}
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//     >
//       <path d={path} fill={fill} />
//     </svg>
//   );
// }

// export default function createSvgIcon(path, displayName) {
//   const Component = React.memo(
//     React.forwardRef((props, ref) => (
//       <SvgIcon data-mui-test={`${displayName}Icon`} ref={ref} {...props}>
//         {path}
//       </SvgIcon>
//       <SvgIcon>
//         {path}
//       </SvgIcon>
//     ))
//   );

//   if (process.env.NODE_ENV !== "production") {
//     Component.displayName = `${displayName}Icon`;
//   }

//   Component.muiName = SvgIcon.muiName;

//   return Component;
// }

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
