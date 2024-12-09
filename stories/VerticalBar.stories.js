import React from "react";
import VerticalBar from "../src/Components/VerticalBar/VerticalBar";
import AddBox from "@material-ui/icons/AddBox";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PermDataSettingIcon from "@material-ui/icons/PermDataSettingOutlined";
import InsertEmoji from "@material-ui/icons/InsertEmoticon";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default {
  title: "Vertical Bar",
};

export const simple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <VerticalBar
        upperElement={<InsertEmoji></InsertEmoji>}
        navigationList={[
          <AddBox></AddBox>,
          <SupervisorAccountIcon></SupervisorAccountIcon>,
          <PermDataSettingIcon></PermDataSettingIcon>,
        ]}
        lowerElement={<AccountCircle></AccountCircle>}
        backgroundColor="#424242"
      ></VerticalBar>
    </div>
  );
};

simple.story = {
  name: "Default Bar",
};
