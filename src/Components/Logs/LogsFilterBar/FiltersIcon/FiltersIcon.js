import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Typography, Tooltip } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main
  },
  iconActive: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1)
  },
  buttonApplyFilters: {
    background: theme.palette.primary.main,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#FAFAFA",
    margin: "0px 20px 10px 20px",
    "&:hover": { background: theme.palette.primary.dark }
  },
  icon: {
    "&:hover": { cursor: "pointer" }
  },
  height: { height: "100%" },
  checkbox: { marginLeft: "10px" },
  limitText: {
    width: "50px",
    margin: theme.spacing(0, 3, 0, 3)
  }
});

const StyledMenu = withStyles(theme => ({
  paper: {
    borderRadius: "8px",
    width: "242px",
    height: "411px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"
  }
}))(props => (
  <Popover
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    autoFocus={false}
    {...props}
  />
));

class FilterIcon extends Component {
  state = { anchorEl: null, otherFilters: [] };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      otherFilters: []
    });
  };

  render() {
    const { classes, disabled, tooltip, title } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={tooltip || title}>
          <IconButton
            size="small"
            onClick={this.handleClick}
            disabled={disabled}
            className={this.props.isActive ? classes.iconActive : classes.icon}
          >
            {this.props.icon}
          </IconButton>
        </Tooltip>
        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
          className={classes.height}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "-webkit-fill-available"
            }}
          >
            <Typography
              component="div"
              style={{
                padding: "10px 10px 0px 20px",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Typography
                component="div"
                style={{
                  fontSize: "24px",
                  fontFamily: "Open Sans",
                  fontWeight: 500
                }}
              >
                {this.props.title}
              </Typography>
              <Typography
                component="div"
                style={{
                  flexGrow: 1
                }}
              ></Typography>
              <Typography
                component="div"
                onClick={this.handleClose}
                className={classes.icon}
              >
                <i className="fas fa-times"></i>
              </Typography>
            </Typography>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                margin: "10px 0px 0px 10px"
              }}
            >
              {this.props.children}
            </div>
          </div>
        </StyledMenu>
      </React.Fragment>
    );
  }
}

FilterIcon.propTypes = {
  isActive: PropTypes.bool,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  title: PropTypes.string
};

FilterIcon.defaultProps = {
  isActive: false,
  disabled: false,
  tooltip: "",
  title: "Filters"
};

export default withStyles(styles, { withTheme: true })(FilterIcon);
