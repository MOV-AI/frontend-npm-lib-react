import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const LogsSkeleton = () => {
  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </>
  );
};

export default LogsSkeleton;
