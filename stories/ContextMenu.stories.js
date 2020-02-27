import React from "react";
import ContextMenu from "../src/Components/ContextMenu";
import Button from "../src/Components/Button";
import CropFree from "@material-ui/icons/CropFreeOutlined";

export default {
  title: "Context Menu"
};

export const simple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ContextMenu></ContextMenu>
    </div>
  );
};

simple.story = {
  name: "Default Context Menu"
};

export const button = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ContextMenu
        element={
          <Button variant="outlined" color="primary">
            Open
          </Button>
        }
        menuList={[
          {
            onClick: () => console.log("clicked 1"),
            element: "Profile",
            onClose: true
          },
          {
            onClick: () => console.log("clicked 2"),
            element: (
              <div>
                <CropFree></CropFree>
                AHAHAHA
              </div>
            ),
            onClose: false
          },
          {
            onClick: () => console.log("clicked 3"),
            element: "AHaha"
          }
        ]}
      ></ContextMenu>
    </div>
  );
};

simple.story = {
  name: "Default Context Menu"
};
