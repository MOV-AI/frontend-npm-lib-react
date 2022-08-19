import React, { useCallback } from "react";
import {
  Input,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText
} from "@material-ui/core";
import { SERVICE_LIST } from "@mov-ai/mov-fe-lib-core";
import { MENU_PROPS } from "./_shared/Constants";
import { useSelectBoxStyle } from "../../styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MEDIA_QUERY_BREAKPOINT } from "../../../../Utils/Constants";

const ServiceSelector = props => {
  // Props
  const { selectedService, handleSelectedService } = props;
  // Style hook
  const classes = useSelectBoxStyle();
  const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

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
    const labels = SERVICE_LIST.filter(service =>
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
        <MenuItem key={service.value} value={service.value}>
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

  return (
    <div data-testid="section_services" className={bigScreen ? classes.toggleContainer : classes.smallToggleContainer}>
      <FormControl className={classes.formControl}>
        <Select
          inputProps={{ "data-testid": "input_select" }}
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          className={bigScreen ? classes.selectBox : classes.smallSelectBox }
          multiple
          value={selectedService}
          onChange={handleSelectedService}
          input={<Input />}
          renderValue={renderValue}
          MenuProps={MENU_PROPS}
        >
          {SERVICE_LIST.map(renderServiceItem)}
        </Select>
      </FormControl>
    </div>
  );
};

export default ServiceSelector;
