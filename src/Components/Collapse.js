import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@material-ui/core/Collapse";
import { Divider, ListItem, List } from "@material-ui/core";

const Collapse = props => {
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(() => {
    if (props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  const handleClickFactory = clickLambda => () => {
    setOpen(!open);
    clickLambda();
  };

  return (
    <List>
      <ListItem button onClick={handleClickFactory(props.onClick)}>
        {open ? (
          <ExpandMore style={{ ...props.iconStyle }} />
        ) : (
          <ChevronRightIcon style={{ ...props.iconStyle }} />
        )}
        <div style={{ width: "100%" }}>{props.item}</div>
      </ListItem>
      {props.divided ? <Divider /> : []}
      <MaterialCollapse
        className={props.className}
        style={props.style}
        in={open}
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
  divided: PropTypes.bool,
  iconStyle: PropTypes.object
};

Collapse.defaultProps = {
  item: <div></div>,
  onClick: () => {},
  open: false,
  divided: false,
  style: {},
  iconStyle: {}
};

export default Collapse;