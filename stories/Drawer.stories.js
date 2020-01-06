import React from "react";
import Drawer from "../src/Components/Drawer";
import List from "@material-ui/core/List";
import { Utils } from "mov.ai-core";
import { ListItem } from "@material-ui/core";
export default {
  title: "Drawer"
};

export const drawerClosed = () => {
  return (
    <Drawer open={false}>
      <List>
        {Utils.range(10).map(i => (
          <ListItem key={"listItem" + i}>
            <span key={"span" + i}>{`Span${i}`}</span>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

drawerClosed.story = {
  name: "closed drawer"
};

export const drawerOpen = () => {
  return (
    <Drawer open={true}>
      <List>
        {Utils.range(10).map(i => (
          <ListItem key={"listItem" + i}>
            <span key={"span" + i}>{`Span${i}`}</span>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

drawerOpen.story = {
  name: "opened drawer"
};
