import React, { useCallback } from "react";
import i18n from "./../../../../i18n";
import {
  Input,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { COLUMN_LIST } from "../../utils/Constants";
import { useSettingsStyles } from "../../styles";
import { MENU_PROPS } from "./_shared/Constants";

const SettingsPopover = (props) => {
  // Props
  const {
    advancedMode,
    handleAdvancedMode,
    limit,
    handleLimit,
    columns,
    handleColumns,
  } = props;
  // Translation hook
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
    [columns],
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <FiltersIcon icon={<TuneIcon></TuneIcon>} title={i18n.t("Configuration")}>
      {/* Advanced/Simple Mode */}
      <FormControlLabel
        control={
          <Switch checked={advancedMode} onChange={handleAdvancedMode} />
        }
        label={advancedMode ? i18n.t("Advanced") : i18n.t("Simple")}
      />
      <div className={classes.filtersButton}>
        {/* Limit Input */}
        <Typography component="div" className={classes.inputHeader}>
          {`${i18n.t("Limit p/Robot")}:`}
        </Typography>
        <TextField
          value={limit}
          onChange={handleLimit}
          className={classes.limitText}
          id="outlined-number"
          placeholder={i18n.t("limit")}
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          size="small"
        />
      </div>
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
            renderValue={(selected) => selected.join(", ")}
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
