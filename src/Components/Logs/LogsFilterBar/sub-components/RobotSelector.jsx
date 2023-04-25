import React, { useCallback, useState } from "react";
// import { useMediaQuery } from '@tty-pt/styles';
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { MENU_PROPS } from "./_shared/Constants";
import { useRobotSelectorStyles } from "../../styles";
// import { MEDIA_QUERY_BREAKPOINT } from "../../../../Utils/Constants";

const RobotSelector = props => {
  // Props
  const { selectedRobots, handleRobotChange } = props;
  const [selected, setSelected] = useState({});
  // Style hook
  const classes = useRobotSelectorStyles();
  const bigScreen = true;
  // Constants
  const INPUT_ICON = (
    <i className={`fas fa-robot ${classes.iconAdornment}`}></i>
  );

  //========================================================================================
  /*                                                                                      *
   *                               Private Secondary Renders                              *
   *                                                                                      */
  //========================================================================================

  /**
   * Render selected robots
   * @param {Array<string>} selected : Array of selected items
   * @returns {string} List of selected robots
   */
  const renderValue = useCallback(selected => {
    return selected.length > 2
      ? [selected[0], selected[1]].join(" , ") + "..."
      : selected.join(" , ");
  }, []);

  const selectRobot = useCallback((index, e) => {
    setSelected({ ...selected, [index]: !selected[index] });
    e.stopPropagation();
  }, [selected]);

  /**
   * Render each robot menu item
   * @param {*} robot : Robot full object
   * @param {*} index : Index from robot list
   * @returns {Component} Menu item for each robot
   */
  const renderRobotItem = useCallback((name, index) => {
    return (
      <MenuItem key={`robotList-${index}`} value={name} onClick={(e) => selectRobot(index, e)}>
        <Checkbox data-testid="output_icon" checked={selected[index] === true} onClick={(e) => selectRobot(index, e)} />
        <ListItemText data-testid="output_label" primary={name} />
      </MenuItem>
    );
  }, [selectRobot, selected]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div
      data-testid="section_robot-selector"
      className={bigScreen ? classes.toggleContainer : classes.smallToggleContainer}
    >
      <FormControl className={classes.formControl}>
        <Select
          data-testid="input_change-robot"
          labelId="select-label"
          id="select"
          multiple
          value={selectedRobots}
          onChange={handleRobotChange}
          renderValue={renderValue}
          input={<Input />}
          startAdornment={INPUT_ICON}
          MenuProps={MENU_PROPS}
        >
          {selectedRobots.map(renderRobotItem)}
        </Select>
      </FormControl>
    </div>
  );
};

export default RobotSelector;
