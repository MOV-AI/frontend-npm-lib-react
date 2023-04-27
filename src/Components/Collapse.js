import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@mui/material/MaterialCollapse";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { EMPTY_FUNCTION } from "../Utils/Constants";

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
    <List data-testid="section_collapse">
      <ListItem button onClick={handleClickFactory(props.onClick)}>
        {open ? (
          <ExpandMore
            data-testid="output_expand-icon"
            style={{ ...props.iconStyle }}
          />
        ) : (
          <ChevronRightIcon
            data-testid="output_collapse-icon"
            style={{ ...props.iconStyle }}
          />
        )}
        <div data-testid="output_item" style={{ width: "100%" }}>
          {props.item}
        </div>
      </ListItem>
      {props.divided ? <Divider /> : []}
      <MaterialCollapse
        data-testid="section_children"
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
  onClick: EMPTY_FUNCTION,
  open: false,
  divided: false,
  style: {},
  iconStyle: {}
};

export default Collapse;
