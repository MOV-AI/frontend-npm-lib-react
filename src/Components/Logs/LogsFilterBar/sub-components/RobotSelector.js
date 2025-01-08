import React, { useCallback } from "react";
import {
  Input,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
} from "@material-ui/core";
import { MENU_PROPS } from "./_shared/Constants";
import { useRobotSelectorStyles } from "../../styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MEDIA_QUERY_BREAKPOINT } from "../../../../Utils/Constants";

const RobotSelector = (props) => {
  // Props
  const { selectedRobots, handleRobotChange } = props;
  // Style hook
  const classes = useRobotSelectorStyles();
  const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);
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
  const renderValue = useCallback((selected) => {
    const selectedNames = selected
      .filter(({ isSelected }) => isSelected)
      .map(({ name }) => name);
    return selectedNames.length > 2
      ? [selectedNames[0], selectedNames[1]].join(" , ") + "..."
      : selectedNames.join(" , ");
  }, []);

  /**
   * Render each robot menu item
   * @param {*} robot : Robot full object
   * @param {*} index : Index from robot list
   * @returns {Component} Menu item for each robot
   */
  const renderRobotItem = useCallback((robot, index) => {
    return (
      <MenuItem key={`robotList-${index}`} value={robot.id}>
        <Checkbox data-testid="output_icon" checked={robot.isSelected} />
        <ListItemText data-testid="output_label" primary={robot.name} />
      </MenuItem>
    );
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <div
      data-testid="section_robot-selector"
      className={
        bigScreen ? classes.toggleContainer : classes.smallToggleContainer
      }
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
