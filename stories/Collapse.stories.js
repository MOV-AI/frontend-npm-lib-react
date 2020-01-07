import React from "react";
import Collapse from "../src/Components/Collapse";
import { List } from "@material-ui/core";
import { Utils } from "mov.ai-core";

export default {
  title: "Collapse"
};

const data = Utils.range(10).map(i => <List>{`data${i}`}</List>);

export const closed = () => {
  return (
    <Collapse open={false} item={<div>simple</div>}>
      {data}
    </Collapse>
  );
};

closed.story = {
  name: "closed Collapse"
};

export const opened = () => {
  return (
    <Collapse open={true} item={<div>simple</div>}>
      {data}
    </Collapse>
  );
};

opened.story = {
  name: "opened Collapse"
};

export const divided = () => {
  return (
    <Collapse divided open={true} item={<div>simple</div>}>
      {data}
    </Collapse>
  );
};

divided.story = {
  name: "divided Collapse"
};
