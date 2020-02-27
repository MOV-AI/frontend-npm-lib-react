import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MaterialChip from "@material-ui/core/Chip";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles(theme => ({
  chipDefault: {
    color: theme.palette.primary.main,
    background: "transparent",
    border: "none",
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.2)
    },
    "&:focus": {
      background: "transparent"
    }
  },
  chipActive: {
    color: theme.palette.primary.main,
    border: "none",
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.2)
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.1)
    }
  }
}));

const Chip = props => {
  const classes = useStyles();
  return (
    <MaterialChip
      label={props.label}
      color="primary"
      className={props.active ? classes.chipActive : classes.chipDefault}
      //variant={props.active ? "default" : "outlined"}
      onClick={() => props.handleFilterClick(props.filterIndex)}
    />
  );
};

Chip.propTypes = {};
Chip.defaultProps = {};

export default Chip;
