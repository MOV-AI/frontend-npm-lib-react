import React, { useCallback } from "react";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { useSelectBoxStyle } from "../../styles";
import { MENU_PROPS } from "./_shared/Constants";
// import useMediaQuery from '@mui/core/useMediaQuery';
// import { MEDIA_QUERY_BREAKPOINT } from "../../../../Utils/Constants";

const LevelSelector = props => {
  // Props
  const { levels, handleLevels, levelsList } = props;
  // Style hook
  const classes = useSelectBoxStyle();
  // const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);
  const bigScreen = true;


  //========================================================================================
  /*                                                                                      *
   *                               Private Secondary Renders                              *
   *                                                                                      */
  //========================================================================================

  /**
   * @private Render Values to be displayed in select box
   * @param {array<object>} selected : Selected levels
   * @returns {string} Selected levels label
   */
  const renderValue = useCallback(
    selected => {
      // selected comes from state, for example ["ERROR", "INFO"]
      // but want to show the lables, for example ["Alerts", "State of Robot"]
      const labels = levelsList
        .filter(level => selected.includes(level.value))
        .map(elem => elem.label);
      return labels.join(", ");
    },
    [levelsList]
  );

  /**
   * @private Render each level menu item
   * @param {{value: string, label: string}} level : Level object
   * @returns {Component} Each level menu item
   */
  const renderLevelItem = useCallback(
    level => {
      return (
        <MenuItem key={level.value} value={level.value}>
          <Checkbox
            data-testid="output_checkbox"
            checked={levels.indexOf(level.value) > -1}
          />
          <ListItemText data-testid="output_label" primary={level.label} />
        </MenuItem>
      );
    },
    [levels]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (<div data-testid="section_levels" className={bigScreen ? classes.toggleContainer : classes.smallToggleContainer}>
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        className={bigScreen ? classes.selectBox : classes.smallSelectBox }
        multiple
        value={levels}
        onChange={handleLevels}
        input={<Input />}
        renderValue={renderValue}
        MenuProps={MENU_PROPS}
      >
        {levelsList.map(renderLevelItem)}
      </Select>
    </FormControl>
  </div>);
};

export default LevelSelector;
