import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@material-ui/core/Collapse";
import { Divider, ListItem, List } from "@material-ui/core";

const Collapse = props => {
  return (
    <List>
      <ListItem button onClick={props.onClick}>
        {props.open ? <ExpandMore /> : <ChevronRightIcon />}
        <div style={{ width: "100%" }}>{props.item}</div>
      </ListItem>
      {props.divided ? <Divider /> : []}
      <MaterialCollapse
        className={props.className}
        style={props.style}
        in={props.open}
      >
        {props.children}
      </MaterialCollapse>
    </List>
  );
};

Collapse.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  divided: PropTypes.bool
};

Collapse.defaultProps = {
  item: <div></div>,
  onClick: () => {},
  open: false,
  divided: false,
  style: {}
};

export default Collapse;
