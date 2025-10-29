import React, { Component } from "react";
import PropTypes from "prop-types";
import Tree from "react-virtualized-tree";
import "material-icons/css/material-icons.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import _get from "lodash/get";
import { ListItemsTreeWithSearch } from "./TreeSearch";
import { EMPTY_FUNCTION } from "../../Utils/Constants";

//========================================================================================
/*                                                                                      *
 *                                     TODO REFACTOR                                    *
 *                                                                                      */
//========================================================================================

const styles = (theme) => ({
  rowWrapper: {
    minHeight: "20px", // very sensitive value, minor change will create issues

    marginBottom: "4px",

    display: "flex",
    alignItems: "center",
  },
  hoverableRow: {
    "&:hover": {
      // You can use the same color as before, or a slightly lighter/darker one
      backgroundColor: "rgba(54,181,230, 0.15)",
    },
  },
  horizFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  preContainer: {
    justifyContent: "space-between",
    "& button": {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "rgba(54, 230, 177, 0.15)",
      "& button": {
        display: "inline-flex",
      },
    },
  },
  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 2,
  },
  iconSpace: {
    flex: 1,
    textAlign: "right",
    minWidth: "45px",
    "& button": {
      position: "relative",
      bottom: "7px",
      padding: "7px",
    },
  },
});

const testArray = [];
for (let index = 0; index < 100; index++) {
  testArray.push({
    id: index,
    name: `1.0.${index}`,
  });
}

const EXPANDED = "EXPANDED";

class BasicVirtualizedTree extends Component {
  state = {
    selectedGroup: EXPANDED,
    groupsEnabled: true,
    searchValue: "",
  };

  searchFilter = (nodes, searchValue) => {
    const searchValueLower = searchValue.toLowerCase();
    const filteredNodes = nodes
      .filter(
        (node) =>
          (!node.name.includes("@SM") &&
            node.name.toLowerCase().includes(searchValueLower)) ||
          node.children.findIndex((ch) =>
            ch.name.toLowerCase().includes(searchValueLower),
          ) >= 0,
      )
      .map((node) => {
        return {
          ...node,
          children: (node?.children || []).filter(
            (ch) =>
              ch.name &&
              !ch.name.includes("@SM") &&
              (node.name.toLowerCase().includes(searchValueLower) ||
                ch.name.toLowerCase().includes(searchValueLower)),
          ),
        };
      });

    // Add children id if missing
    filteredNodes.forEach((node) => {
      node.children.forEach((child, i) => {
        child.id = child.id ? child.id : i;
        if (child.children) {
          child.children.forEach((grandChild, j) => {
            grandChild.id = grandChild.id ? grandChild.id : j;
          });
        }
      });
    });

    return filteredNodes;
  };

  handleSelectedGroupChange = (selectedGroup) => {
    this.setState({ selectedGroup });
  };

  // open: true -> expand
  //       false -> collapse
  handleExpansion = (evt, nodes, node, open) => {
    // const treeData = _cloneDeep(nodes);
    // _set(treeData, [node.id, "state"], {
    //   expanded: open
    // });
    // evt.stopPropagation();
    // this.props.handleChange(treeData);
  };

  render() {
    const { classes } = this.props;
    const iconStyle = <i className="fas fa-home" />;
    const nodes = this.props.data;
    return (
      <div data-testid="section_basic-virtualized-tree">
        <ListItemsTreeWithSearch
          style={{
            overflow: "auto",
          }}
          icon={iconStyle}
          onSearch={(input) => {
            this.setState({
              searchValue: input,
            });
          }}
        >
          <div style={{ height: this.props.height }}>
            <Tree
              nodes={this.searchFilter(nodes, this.state.searchValue)}
              onChange={this.props.handleChange}
            >
              {({ style, node }) => {
                // Adjust tree indentation
                style.paddingLeft = style.marginLeft / 1.5;
                style.marginLeft = 0;
                // Render tree element
                return (
                  <div
                    data-testid="section_tree"
                    style={style}
                    onClick={() => this.props.onClickNode(node)}
                    onDoubleClick={() => this.props.onDoubleClickNode(node)}
                    className={`${classes.rowWrapper} ${classes.hoverableRow} ${!_get(node, `children`, false) ? classes.preContainer : ""}`}
                  >
                    <Box p={0}>
                      <Grid alignContent={"space-between"} container>
                        {_get(node, `children`, false) &&
                          node.state?.expanded && (
                            <ExpandMoreIcon
                              data-testid="input_collapse"
                              onClick={(evt) => {
                                this.handleExpansion(evt, nodes, node, false);
                              }}
                            />
                          )}
                        {_get(node, `children`, false) &&
                          !node.state?.expanded && (
                            <ChevronRightIcon
                              data-testid="input_expand"
                              onClick={(evt) => {
                                this.handleExpansion(evt, nodes, node, true);
                              }}
                            />
                          )}

                        <div
                          className={
                            !_get(node, `children`, false)
                              ? classes.spaceBetween
                              : ""
                          }
                        >
                          <div className={classes.ellipsis}>{node.name}</div>
                        </div>
                      </Grid>
                    </Box>
                  </div>
                );
              }}
            </Tree>
          </div>
        </ListItemsTreeWithSearch>
      </div>
    );
  }
}

BasicVirtualizedTree.propTypes = {
  data: PropTypes.array,
  onClickNode: PropTypes.func,
  onDoubleClickNode: PropTypes.func,
  handleChange: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BasicVirtualizedTree.defaultProps = {
  data: [],
  onClickNode: EMPTY_FUNCTION,
  onDoubleClickNode: EMPTY_FUNCTION,
  handleChange: EMPTY_FUNCTION,
  height: 700,
};

export default withStyles(styles, { withTheme: true })(BasicVirtualizedTree);
