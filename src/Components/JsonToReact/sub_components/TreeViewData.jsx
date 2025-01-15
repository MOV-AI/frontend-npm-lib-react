import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { isObject } from "../../../Utils/Utils";
import { Tooltip } from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `${theme.palette.grey[700]}`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent",
      },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  labelInfo: {
    maxWidth: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {LabelIcon && (
            <LabelIcon color="inherit" className={classes.labelIcon} />
          )}
          <Tooltip title={labelText}>
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
          </Tooltip>
          <Tooltip title={labelInfo}>
            <Typography
              variant="caption"
              color="inherit"
              className={classes.labelInfo}
            >
              {labelInfo}
            </Typography>
          </Tooltip>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TreeViewData(props) {
  const classes = useStyles();

  const stringify = (value) => {
    return typeof value === "string" ? value : JSON.stringify(value);
  };

  const getTreeData = (data, path = []) => {
    return Object.keys(data).map((key, index) => {
      const newPath = [...path, key];
      if (isObject(data[key]))
        return (
          <StyledTreeItem
            key={newPath.join(".") + index}
            nodeId={newPath.join(".") + index}
            labelText={key}
          >
            {getTreeData(data[key], newPath)}
          </StyledTreeItem>
        );
      else
        return (
          <StyledTreeItem
            key={newPath.join(".") + index}
            nodeId={newPath.join(".") + index}
            labelInfo={stringify(data[key])}
            labelText={key}
          />
        );
    });
  };

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={[]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {getTreeData(props?.data || {})}
    </TreeView>
  );
}
