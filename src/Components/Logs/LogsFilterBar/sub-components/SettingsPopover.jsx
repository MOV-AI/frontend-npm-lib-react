import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { makeMagic } from "@tty-pt/styles";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import { PopperButton } from "../../../HomeMenu/HomeMenu";
import { COLUMN_LIST } from "../../utils/Constants";
// import { useSettingsStyles } from "../../styles";
import { MENU_PROPS } from "./_shared/Constants";

makeMagic({
  z900: {
    zIndex: 900,
  },
  z901: {
    zIndex: 901,
  }
});

const SettingsPopover = props => {
  // Props
  const {
    limit,
    handleLimit,
    columns,
    handleColumns
  } = props;
  // Translation hook
  const { t } = useTranslation();
  // Style hooks

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
    <PopperButton id="settings" Icon={TuneIcon}>
      <div className="background-gray-dark pad vertical z-901">
        <div className="filters-button">
          {/* Limit Input */}
          <Typography component="div" className="input-header">
            {`${t("Limit p/Robot")}:`}
          </Typography>
          <TextField
            value={limit}
            onChange={handleLimit}
            className="limit-text"
            id="outlined-number"
            placeholder={t("limit")}
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            size="small"
          />
        </div>
        <div className="columns-filter">
          {/* Columns Selection */}
          <Typography component="div" className="input-header">
            {`${t("Columns")}:`}
          </Typography>
          <FormControl className="form-control">
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={columns}
              onChange={handleColumns}
              renderValue={selected => selected.join(", ")}
              MenuProps={MENU_PROPS}
            >
              {Object.keys(COLUMN_LIST).map(renderColumnItem)}
            </Select>
          </FormControl>
        </div>
      </div>
    </PopperButton>
  );
};

export default SettingsPopover;
