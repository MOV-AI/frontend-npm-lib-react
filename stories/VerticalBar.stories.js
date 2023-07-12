import React from "react";
import VerticalBar from "../src/Components/VerticalBar/VerticalBar";
import AddBox from "@mui/icons-material/AddBox";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import InsertEmoji from "@mui/icons-material/InsertEmoji";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default {
  title: "Vertical Bar"
};

export const simple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <VerticalBar
        upperElement={<InsertEmoji></InsertEmoji>}
        navigationList={[
          <AddBox></AddBox>,
          <SupervisorAccountIcon></SupervisorAccountIcon>,
          <PermDataSettingIcon></PermDataSettingIcon>
        ]}
        lowerElement={<AccountCircle></AccountCircle>}
        backgroundColor="#424242"
      ></VerticalBar>
    </div>
  );
};

simple.story = {
  name: "Default Bar"
};
