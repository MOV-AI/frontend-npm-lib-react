import React, { Component } from "react";
import {
  List,
  InputBase,
  IconButton,
  Typography,
  Divider,
  ListItem
} from "@material-ui/core";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import i18n from "../../i18n/i18n.js";

class TreeSearch extends Component {
  searchInput = null;
  timer = null;
  inputRef = React.createRef();

  handleChange = evt => {
    this.searchInput = evt.target.value;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.handleSearch, 250);
  };

  handleSearch = () => {
    if (this.searchInput !== null) this.props.search(this.searchInput);
  };

  resetValue() {
    const input = this.inputRef.current.children[0];
    input.value = "";
    input.focus();
    this.searchInput = "";
    this.handleSearch();
    this.forceUpdate();
  }

  isEmpty() {
    return this.searchInput === null || this.searchInput.trim() === "";
  }

  render() {
    return (
      <Typography
        data-testid="section_tree-search"
        component="div"
        style={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
      >
        <InputBase
          inputProps={{ "data-testid": "input_search" }}
          ref={this.inputRef}
          style={{
            marginLeft: 10,
            flex: 1
          }}
          placeholder={i18n.t("Search")}
          onChange={this.handleChange}
        />
        <IconButton
          data-testid="input_icon"
          style={{ padding: 10 }}
          onClick={() => {
            if (!this.isEmpty()) {
              this.resetValue();
            }
          }}
        >
          {this.isEmpty() ? <SearchIcon /> : <ClearIcon />}
        </IconButton>
      </Typography>
    );
  }
}

/**
 *
 * @param {*} props: contains children which are Items
 */
const ListItemsTree = props => {
  return (
    <List
      data-testid="section_list"
      style={{ paddingLeft: "0px", paddingRight: "0px", ...props.style }}
      dense={true}
      component="div"
      onKeyUp={props.onKeyUp}
    >
      {props.children}
    </List>
  );
};

const ListItemsTreeWithTitle = props => {
  return (
    <ListItemsTree>
      <ListItem>
        <Typography data-testid="output_title" component={props.variant}>
          {props.title}
        </Typography>
      </ListItem>
      <Divider />
      {props.children}
    </ListItemsTree>
  );
};
/* 
  TODO: think about how to generalize the search

  Using either the _shared/Search method or using a predicate 
*/
const ListItemsTreeWithSearch = props => {
  return (
    <ListItemsTree
      data-testid="section_list-items"
      style={{ flexGrow: 1, paddingBottom: "0px", paddingTop: "0px" }}
      onKeyUp={props.onKeyUp}
    >
      <ListItem>
        <TreeSearch search={input => props.onSearch(input)} />
      </ListItem>
      <Divider />
      <Typography style={props.style} component="div">
        {React.Children.map(props.children, x => {
          return x;
        })}
      </Typography>
    </ListItemsTree>
  );
};

ListItemsTreeWithSearch.propTypes = {
  onSearch: PropTypes.func
};

ListItemsTreeWithSearch.defaultProps = {
  onSearch: input => console.log(input)
};

export { ListItemsTree, ListItemsTreeWithSearch, ListItemsTreeWithTitle };
