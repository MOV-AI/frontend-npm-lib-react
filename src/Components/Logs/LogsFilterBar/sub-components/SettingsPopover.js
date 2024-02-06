import React, { useCallback } from "react";
import i18n from "i18next";
import {
  Input,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  Typography
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { COLUMN_LIST } from "../../utils/Constants";
import { useSettingsStyles } from "../../styles";
import { MENU_PROPS } from "./_shared/Constants";

const SettingsPopover = props => {
  // Props
  const {
    columns,
    handleColumns
  } = props;
  // Style hooks
  const classes = useSettingsStyles();

  //========================================================================================
  /*                                                                                      *
   *                               Private Secondary Renders                              *
   *                                                                                      */
  //========================================================================================

  /**
   * @private Render column menu items
   * @param {*} column
   * @param {*} index
   * @returns {Component} Column menu item
   */
  const renderColumnItem = useCallback(
    (column, index) => {
      return (
        <MenuItem key={index} value={column}>
          <Checkbox checked={columns.indexOf(column) > -1} />
          <ListItemText primary={COLUMN_LIST[column].label} />
        </MenuItem>
      );
    },
    [columns]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <FiltersIcon icon={<TuneIcon></TuneIcon>} title={i18n.t("Configuration")}>
      <div className={classes.columnsFilter}>
        {/* Columns Selection */}
        <Typography component="div" className={classes.inputHeader}>
          {`${i18n.t("Columns")}:`}
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={columns}
            onChange={handleColumns}
            input={<Input />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MENU_PROPS}
          >
            {Object.keys(COLUMN_LIST).map(renderColumnItem)}
          </Select>
        </FormControl>
      </div>
    </FiltersIcon>
  );
};

export default SettingsPopover;
