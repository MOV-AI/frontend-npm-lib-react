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
        component="div"
        style={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%"
        }}
      >
        <InputBase
          ref={this.inputRef}
          style={{
            marginLeft: 10,
            flex: 1
          }}
          placeholder="Search"
          onChange={this.handleChange}
        />
        <IconButton
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
        <Typography component={props.variant}>{props.title}</Typography>
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