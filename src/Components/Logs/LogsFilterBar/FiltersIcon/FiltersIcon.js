import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import { Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
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
    backgroundColor: fade(theme.palette.primary.main, 0.1)
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
    // fontSize: "18px",
    // height: "21px",
    // width: "15px",
    //color: theme.palette.primary.main,
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
    // border: "1px solid #F0F0F0",
    borderRadius: "8px",
    width: "242px",
    height: "411px",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)"
  }
}))(props => (
  <Menu
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
    const { classes, t } = this.props;
    return (
      <React.Fragment>
        <IconButton
          size="small"
          onClick={this.handleClick}
          className={this.props.isActive ? classes.iconActive : classes.icon}
        >
          {this.props.icon}
        </IconButton>
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
  title: PropTypes.string
};

FilterIcon.defaultProps = {
  isActive: false,
  title: "Filters"
};

export default withStyles(styles, { withTheme: true })(FilterIcon);
