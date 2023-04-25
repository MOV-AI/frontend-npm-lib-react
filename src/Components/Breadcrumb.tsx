import React from "react";
import { makeMagic } from "@tty-pt/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PropTypes from "prop-types";
import { BreadcrumbProps } from "./types";

makeMagic({
  root: {
    "& > * + *": {
      marginTop: "16px 16px !important",
    }
  },
  link: {
    fontSize: "24px",
    fontWeight: 800,
    fontFamily: "Open Sans",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  lastLabel: {
    fontSize: "24px",
    fontWeight: 800,
    fontFamily: "Open Sans"
  }
});

const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <div data-testid="section_breadcrumb" className="root">
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
                className="link"
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
          className="last-label"
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
