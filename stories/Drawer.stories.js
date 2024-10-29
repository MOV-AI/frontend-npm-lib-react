import React from "react";
import Drawer from "../src/Components/Drawer";
import Button from "../src/Components/Button";
import List from "@mui/material/List";
import { Utils } from "@mov-ai/mov-fe-lib-core";
import ListItem from "@mui/material";
export default {
  title: "Drawer",
};

const drawerFactory = (initialOpen) => () => {
  const [open, setOpen] = React.useState(initialOpen);
  return (
    <div>
      <Button onClick={() => setOpen(!open)}>Toggle</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {Utils.range(10).map((i) => (
            <ListItem key={"listItem" + i}>
              <span key={"span" + i}>{`Span${i}`}</span>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export const drawerClosed = drawerFactory(false);

drawerClosed.story = {
  name: "closed drawer",
};

export const drawerOpen = drawerFactory(true);

drawerOpen.story = {
  name: "opened drawer",
};
