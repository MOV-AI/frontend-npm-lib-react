import React from "react";
import Breadcrumb from "../src/Components/Breadcrumb";
export default {
  title: "Breadcrumbs"
};

export const simpleBreadcrumb = () => {
  return <Breadcrumb></Breadcrumb>;
};

simpleBreadcrumb.story = {
  name: "simple breadcrumb"
};
