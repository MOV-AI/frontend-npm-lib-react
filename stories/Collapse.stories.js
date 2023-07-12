import React from "react";
import Collapse from "../src/Components/Collapse";
import List from "@mui/material/List";
import { Utils } from "@mov-ai/mov-fe-lib-core";

export default {
  title: "Collapse"
};

const data = Utils.range(10).map(i => <List key={i}>{`data${i}`}</List>);

export const closed = () => {
  return (
    <Collapse open={false} item={<div>simple</div>}>
      {data}
    </Collapse>
  );
};

closed.story = {
  name: "closed Collapse "
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

export const iconStyled = () => {
  return (
    <Collapse
      open={false}
      iconStyle={{ color: "blue" }}
      item={<div>simple</div>}
    >
      {data}
    </Collapse>
  );
};

iconStyled.story = {
  name: "Icon styled"
};
