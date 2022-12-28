import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { homeMenuPopperStyles } from "./styles";

const HomeMenuSkeleton = () => {
  const classes = homeMenuPopperStyles();
  const sklArr = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6"];

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <div className={classes.menuWrapper}>
      {sklArr.map(el => {
        return (
          <div key={el} className={classes.skeletonCard}>
            <Skeleton
              width={108}
              height={140}
              animation="wave"
              className={classes.menuButton}
            />
          </div>
        );
      })}
    </div>
  );
};

export default HomeMenuSkeleton;
