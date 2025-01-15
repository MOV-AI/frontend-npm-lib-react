import React, { Component } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import MoreVert from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import i18n from "./../../i18n";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  itemTextOverflow: {
    "& span": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

export const Item = (props) => {
  const { before, after, ...otherProps } = props;
  const classes = useStyles();

  return (
    <ListItem button={Boolean(props.onClick)} {...otherProps}>
      {before}
      <Tooltip title={props.text}>
        <ListItemText
          primary={props.text}
          className={classes.itemTextOverflow}
        />
      </Tooltip>
      {after}
    </ListItem>
  );
};

export const ItemBeforePlus = (props) => {
  const { plusClick, ...otherProps } = props;
  return (
    <Item
      {...otherProps}
      before={
        <Tooltip title={i18n.t(`Add`)}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              props.plusClick();
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      }
      text={props.text}
      after={props.after}
    />
  );
};

export const ItemAfterHoriz = (props) => {
  return (
    <Tooltip title={i18n.t("Actions")}>
      <Item
        {...props}
        before={props.before}
        text={props.text}
        after={
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              props.horizClick(e);
            }}
          >
            <MoreHoriz />
          </IconButton>
        }
      />
    </Tooltip>
  );
};

export const ItemAfterVert = (props) => {
  const { vertClick, ...otherProps } = props;
  return (
    <Item
      {...otherProps}
      before={props.before}
      text={props.text}
      after={
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            vertClick(e);
          }}
          disabled={props.disabled}
        >
          <MoreVert />
        </IconButton>
      }
    />
  );
};

export class ItemWithMenuItems extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  addClickFunction = (onClick) => {
    return (e) => {
      e.stopPropagation();
      onClick();
      this.handleClose();
    };
  };

  render() {
    if (!this.props.itemFactory) return [];
    return (
      <Typography component="div">
        {this.props.itemFactory(this.props, this.handleClick)}
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.menuItems.map((menuItem, i) => (
            <Tooltip title={menuItem.title}>
              <MenuItem
                key={`MenuItem${i}`}
                onClick={this.addClickFunction(menuItem.onClick)}
              >
                {menuItem.icon}
                {menuItem.title}
              </MenuItem>
            </Tooltip>
          ))}
        </Menu>
      </Typography>
    );
  }
}

ItemWithMenuItems.propTypes = {
  itemFactory: PropTypes.func,
  menuItems: PropTypes.array,
};

ItemWithMenuItems.defaultProps = {
  itemFactory: null,
  menuItems: [],
};

ItemBeforePlus.propTypes = {
  plusClick: PropTypes.func,
};

ItemBeforePlus.defaultProps = {
  plusClick: () => {},
};

ItemAfterHoriz.propTypes = {
  horizClick: PropTypes.func,
};

ItemAfterHoriz.defaultProps = {
  horizClick: () => {},
};
