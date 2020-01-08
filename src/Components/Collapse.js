import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@material-ui/core/Collapse";
import { Divider, ListItem, List } from "@material-ui/core";

const Collapse = props => {
  return (
    <List>
      <ListItem button style={{ ...props.style }} onClick={props.onClose()}>
        {props.open ? (
          <ExpandMore style={props.iconStyle} />
        ) : (
          <ChevronRightIcon style={props.iconStyle} />
        )}
        <div>{props.item}</div>
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
  onClose: PropTypes.func,
  open: PropTypes.bool,
  divided: PropTypes.bool,
  iconStyle: PropTypes.object
};

Collapse.defaultProps = {
  item: <div></div>,
  onClose: () => {},
  open: false,
  divided: false,
  iconStyle: {},
  style: {}
};

export default Collapse;
