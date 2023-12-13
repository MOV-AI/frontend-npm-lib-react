import React from "react";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MaterialChip from "@mui/material/Chip";

const useStyles = makeStyles(theme => ({
  chipDefault: {
    color: theme.palette.primary.main,
    background: "transparent",
    border: "none",
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2)
    },
    "&:focus": {
      background: "transparent"
    }
  },
  chipActive: {
    color: theme.palette.primary.main,
    border: "none",
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2)
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1)
    }
  }
}));

const Chip = props => {
  const classes = useStyles();
  return (
    <MaterialChip
      data-testid="input_chip"
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
