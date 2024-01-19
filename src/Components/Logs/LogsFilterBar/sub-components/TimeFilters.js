import React, { useCallback } from "react";
import { t } from "../../../../i18n/i18n";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TodayIcon from "@material-ui/icons/Today";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { DATE_KEY_OPTION } from "../../utils/Constants";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

const TimeFilters = props => {
  // Props
  const { selectedFromDate, selectedToDate, handleDateChange } = props;

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Triggered on From date change
   */
  const handleFromDateChange = useCallback(
    newDate => handleDateChange(newDate, DATE_KEY_OPTION.FROM),
    [handleDateChange]
  );

  /**
   * Triggered on To date change
   */
  const handleToDateChange = useCallback(
    newDate => handleDateChange(newDate, DATE_KEY_OPTION.TO),
    [handleDateChange]
  );

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <FiltersIcon
      icon={<TodayIcon />}
      title={t("Date Range")}
      isActive={!selectedFromDate || !selectedToDate}
    >
      {/* From -> To Date */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          key="time-picker"
          size="small"
          variant="inline"
          ampm={false}
          label={t("From date")}
          value={selectedFromDate}
          onChange={handleFromDateChange}
          format={DATE_TIME_FORMAT}
        />
        <KeyboardDateTimePicker
          key="time-picker2"
          size="small"
          variant="inline"
          ampm={false}
          label={t("To date")}
          value={selectedToDate}
          onChange={handleToDateChange}
          format={DATE_TIME_FORMAT}
        />
      </MuiPickersUtilsProvider>
    </FiltersIcon>
  );
};

export default TimeFilters;
