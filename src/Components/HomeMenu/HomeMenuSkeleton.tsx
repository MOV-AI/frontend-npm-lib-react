import React from "react";
import Skeleton from "@mui/lab/Skeleton";
// import { homeMenuPopperStyles } from "./styles";

const HomeMenuSkeleton = () => {
  const sklArr = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6"];

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <div className="menu-wrapper">
      {sklArr.map(el => {
        return (
          <div key={el} className="skeleton-card">
            <Skeleton
              width={108}
              height={140}
              animation="wave"
              className="menu-button"
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeMenuSkeleton;
