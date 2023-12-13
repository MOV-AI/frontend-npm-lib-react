import React, { useCallback } from "react";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";
import { MENU_PROPS } from "./_shared/Constants";

const ServiceSelector = props => {
  // Props
  const { selectedService, handleSelectedService } = props;
  // Style hook
  // const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);
  const bigScreen = true;

  //========================================================================================
  /*                                                                                      *
   *                               Private Secondary Renders                              *
   *                                                                                      */
  //========================================================================================

  /**
   * @private Render selected services
   * @param {Array<string>} selected : Array of selected items
   * @returns {string} List of selected services
   */
  const renderValue = useCallback(selected => {
    const labels = CONSTANTS.SERVICE_LIST.filter(service =>
      selected.includes(service.value)
    ).map(elem => elem.label);
    return labels.join(", ");
  }, []);

  /**
   * Render each service menu item
   * @param {{value: string, label: string}} service : Service full object
   * @returns {Component} Menu item for each service
   */
  const renderServiceItem = useCallback(
    service => {
      return (
        <MenuItem key={`service-item-${service.value}`} value={service.value}>
          <Checkbox
            inputProps={{ "data-testid": "input_checkbox" }}
            checked={selectedService.indexOf(service.value) > -1}
          />
          <ListItemText data-testid="output_label" primary={service.label} />
        </MenuItem>
      );
    },
    [selectedService]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (<Select
    inputProps={{ "data-testid": "input_select" }}
    labelId="demo-mutiple-checkbox-label"
    id="demo-mutiple-checkbox"
    className={bigScreen ? "select-box" : "small-select-box"}
    multiple
    value={selectedService}
    onChange={handleSelectedService}
    input={<Input />}
    renderValue={renderValue}
    MenuProps={MENU_PROPS}
  >
    {CONSTANTS.SERVICE_LIST.map(renderServiceItem)}
  </Select>);
};

export default ServiceSelector;
