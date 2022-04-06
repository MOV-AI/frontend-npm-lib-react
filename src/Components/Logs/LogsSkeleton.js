import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const LogsSkeleton = () => {
  const tableSkeleton = ["row1", "row2", "row3"];
  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <>
      {tableSkeleton.map(el => (
        <Skeleton animation="wave" key={el} />
      ))}
    </>
  );
};

export default LogsSkeleton;
