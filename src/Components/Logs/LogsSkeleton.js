import React from "react";
import Skeleton from "@mui/material/Skeleton";

const LogsSkeleton = () => {
  const tableSkeleton = ["row1", "row2", "row3"];
  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <>
      {tableSkeleton.map((el) => (
        <Skeleton data-testid="output_skeleton" animation="wave" key={el} />
      ))}
    </>
  );
};

export default LogsSkeleton;
