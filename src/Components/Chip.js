import React from "react";
import MaterialChip from "@material-ui/core/Chip";

const Chip = props => {
  return (
    <MaterialChip
      data-testid="input_chip"
      label={props.label}
      color="primary"
      className={props.active ? "chip-active" : "chip"}
      //variant={props.active ? "default" : "outlined"}
      onClick={() => props.handleFilterClick(props.filterIndex)}
    />
  );
};

Chip.propTypes = {};
Chip.defaultProps = {};

export default Chip;
