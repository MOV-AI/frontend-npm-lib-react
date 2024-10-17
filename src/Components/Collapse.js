import React from "react";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import MaterialCollapse from "@material-ui/core/Collapse";
import { Divider, ListItem, List } from "@material-ui/core";
import { EMPTY_FUNCTION } from "../Utils/Constants";

const Collapse = (props) => {
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(() => {
    if (props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  const handleClickFactory = (clickLambda) => () => {
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
  iconStyle: PropTypes.object,
};

Collapse.defaultProps = {
  item: <div></div>,
  onClick: EMPTY_FUNCTION,
  open: false,
  divided: false,
  style: {},
  iconStyle: {},
};

export default Collapse;
