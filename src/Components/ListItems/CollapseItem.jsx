import React, { Component } from "react";
import { Collapse, Typography } from "@material-ui/core";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ListItems } from "./ListItems";
import PropTypes from "prop-types";
import { Item } from "./Item";

class CollapseItem extends Component {
  state = {
    open: this.props.open,
  };
  static COLLAPSE_ITEM_STYLE = {
    paddingLeft: "30px",
    width: "100%",
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.open !== this.props.open ||
      prevProps.updateId !== this.props.updateId
    ) {
      this.setState({ open: this.props.open });
    }
  }

  handleChange = () => {
    const newState = !this.state.open;
    if (this.props.onStateChange) this.props.onStateChange(newState, this);
    this.setState({ open: newState });
  };

  getCollapseIcon() {
    return this.state.open ? <ExpandLess /> : <ExpandMore />;
  }

  renderItem(item) {
    let finalAfter = this.getCollapseIcon();
    if (item.props.after) {
      finalAfter = (
        <Typography component="div">
          {item.props.after}
          {finalAfter}
        </Typography>
      );
    }
    return React.cloneElement(item, {
      after: finalAfter,
      onClick: this.handleChange,
    });
  }

  render() {
    return (
      <Typography component="div">
        <ListItems>{this.renderItem(this.props.item)}</ListItems>
        <Collapse in={this.state.open}>
          <ListItems>
            <Typography
              component="div"
              style={{
                height: this.props.height ? this.props.height : "100%",
                overflow: this.props.height ? "auto" : "hidden",
                overflowX: this.props.overflowX ? this.props.overflowX : "auto",
              }}
            >
              {React.Children.map(this.props.children, (child) => child)}
            </Typography>
          </ListItems>
        </Collapse>
      </Typography>
    );
  }
}

CollapseItem.propTypes = {
  height: PropTypes.string,
  item: PropTypes.object,
  open: PropTypes.bool,
};

CollapseItem.defaultProps = {
  height: "",
  item: <Item></Item>,
  open: false,
};

export default CollapseItem;
