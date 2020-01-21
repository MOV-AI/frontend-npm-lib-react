import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  link: {
    fontSize: "24px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  }
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const Breadcrumb = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {props.pathList.map((element, index) => {
          if (props.pathList.length - 1 !== index) {
            return (
              <Typography
                color="primary"
                variant="inherit"
                className={classes.link}
              >
                {element.label}
              </Typography>
            );
          }
        })}
        <Typography color="textPrimary">
          {props.pathList[props.pathList.length - 1].label}
        </Typography>
      </Breadcrumbs>
    </div>
  );
};

Breadcrumb.propTypes = {
  pathList: PropTypes.array
};

Breadcrumb.defaultProps = {
  pathList: [
    { label: "Mov.ai", path: "/" },
    { label: "User", path: "/" },
    { label: "Vicente", path: "/" }
  ]
};

export default Breadcrumb;
