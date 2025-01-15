import React, { Component } from "react";
import {
  List,
  InputBase,
  IconButton,
  Typography,
  Divider,
  ListItem,
} from "@material-ui/core";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

class Search extends Component {
  searchInput = null;
  timer = null;
  inputRef = React.createRef();

  handleChange = (evt) => {
    this.searchInput = evt.target.value;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.handleSearch, 250);
  };

  handleSearch = () => {
    const input = this.inputRef?.current?.children[0];
    const searchInput = input?.value;
    if (searchInput !== null) {
      this.props.search(searchInput);
      this.forceUpdate();
    }
  };

  resetValue() {
    this.props.search("");
    const input = this.inputRef.current.children[0];
    input.value = "";
    input.focus();
    this.searchInput = "";
    this.handleSearch();
    this.forceUpdate();
  }

  isEmpty() {
    const input = this.inputRef?.current?.children[0];
    return !input?.value;
  }

  render() {
    return (
      <Typography
        component="div"
        style={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          ref={this.inputRef}
          style={{
            marginLeft: 10,
            flex: 1,
          }}
          placeholder="Search"
          onFocus={this.props.removeKeyBinding}
          onBlur={this.props.restoreKeyBinding}
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

Search.defaultProps = {
  search: () => {},
  removeKeyBinding: () => {},
  restoreKeyBinding: () => {},
};

const useStylesListItems = makeStyles((theme) => {
  return { list: { paddingLeft: "0px", paddingRight: "0px" } };
});

/**
 *
 * @param {*} props: contains children which are Items
 */
const ListItems = (props) => {
  const classes = useStylesListItems();
  return (
    <List
      style={props.style}
      className={classes.list}
      dense={true}
      component="div"
      onKeyUp={props.onKeyUp}
    >
      {props.children}
    </List>
  );
};

const ListItemsWithTitle = (props) => {
  return (
    <ListItems>
      <ListItem>
        <Typography component={props.variant}>{props.title}</Typography>
      </ListItem>
      <Divider />
      {props.children}
    </ListItems>
  );
};

const SEARCH_INPUT_SIZE = 56;
const useStylesListWithSearch = makeStyles((theme) => {
  return {
    root: { flexGrow: 1, height: "100%" },
    list: {
      overflow: "hidden auto",
      position: "relative",
      height: `calc(100% - ${SEARCH_INPUT_SIZE}px)`,
    },
  };
});
/* 
  TODO: think about how to generalize the search

  Using either the _shared/Search method or using a predicate 
*/
const ListItemsWithSearch = (props) => {
  const classes = useStylesListWithSearch();
  return (
    <ListItems onKeyUp={props.onKeyUp} className={classes.root}>
      <ListItem>
        <Search
          search={props.onSearch}
          restoreKeyBinding={props.restoreKeyBinding}
          removeKeyBinding={props.removeKeyBinding}
        />
      </ListItem>
      <Divider />
      <Typography
        className={classes.list}
        style={{
          ...props.style,
        }}
        component="div"
      >
        {React.Children.map(props.children, (x) => {
          return x;
        })}
      </Typography>
    </ListItems>
  );
};

ListItemsWithSearch.propTypes = {
  onSearch: PropTypes.func,
  removeKeyBinding: PropTypes.func,
  restoreKeyBinding: PropTypes.func,
};

ListItemsWithSearch.defaultProps = {
  removeKeyBinding: () => {},
  restoreKeyBinding: () => {},
  onSearch: (input) => console.log(input),
};

export { ListItems, ListItemsWithSearch, ListItemsWithTitle, Search };
