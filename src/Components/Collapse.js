import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@material-ui/core/Collapse";
import { Divider } from "@material-ui/core";

const Collapse = props => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div onClick={props.onClose()}>
          {props.open ? (
            <ExpandMore style={props.iconStyle} />
          ) : (
            <ChevronRightIcon style={props.iconStyle} />
          )}
        </div>
        <div>{props.item}</div>
      </div>
      {props.divided ? <Divider></Divider> : []}
      <MaterialCollapse
        className={props.className}
        style={props.style}
        in={props.open}
      >
        {props.children}
      </MaterialCollapse>
    </div>
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
  iconStyle: {}
};

export default Collapse;
