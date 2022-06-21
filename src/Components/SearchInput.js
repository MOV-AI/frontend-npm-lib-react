import React, { Component } from "react";
import { withStyles, alpha } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class SearchInput extends Component {
  searchInput = undefined;
  timer = undefined;

  handleChange = evt => {
    this.searchInput = evt.target.value;
    if (this.props.enableTimeout) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.handleSearch, this.props.time);
    } else {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    if (this.searchInput !== undefined) this.props.onChange(this.searchInput);
  };

  render() {
    const { classes, style, placeholder } = this.props;
    return (
      <div
        data-testid="section_search"
        className={classes.search}
        style={style}
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          ref={this.setSearchInput}
          placeholder={placeholder}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          inputProps={{ "aria-label": "search", "data-testid": "input_base" }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  time: PropTypes.number,
  enableTimeout: PropTypes.bool,
  style: PropTypes.object
};

SearchInput.defaultProps = {
  placeholder: "Search...",
  onChange: input => {
    console.log(input);
  },
  time: 250,
  enableTimeout: true,
  style: {}
};

export default withStyles(styles, { withTheme: true })(SearchInput);
