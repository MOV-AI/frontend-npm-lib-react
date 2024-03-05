import React from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { BreadcrumbProps } from "./types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2) + " !important",
    }
  },
  link: {
    fontSize: "24px !important",
    fontWeight: "800 !important",
    fontFamily: "Open Sans !important",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  lastLabel: {
    fontSize: "24px !important",
    fontWeight: "800 !important",
    fontFamily: "Open Sans !important"
  }
}));

const Breadcrumb = (props: BreadcrumbProps) => {
  const classes = useStyles();
  return (
    <div data-testid="section_breadcrumb" className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        style={props.style}
      >
        {props.pathList.map((element, index) => {
          if (props.pathList.length - 1 !== index) {
            return (
              <Typography
                data-testid="input_button"
                key={index}
                color="primary"
                variant="inherit"
                className={classes.link}
                onClick={element.function}
              >
                {element.label}
              </Typography>
            );
          }
        })}
        <Typography
          data-testid="output_path-list"
          color="textPrimary"
          className={classes.lastLabel}
        >
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
    { label: "Mov.ai", function: () => console.log("pth1/") },
    { label: "User", function: () => console.log("path1/path2") },
    { label: "John Doe" }
  ]
};

export default Breadcrumb;
