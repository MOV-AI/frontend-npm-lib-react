import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
// import KeyboardDateTimePicker from "@mui/x-date-pickers/KeyboardDateTimePicker";
// import MuiPickersUtilsProvider from "@mui/x-date-pickers/MuiPickersUtilsProvider";
import TodayIcon from "@mui/icons-material/Today";
import FiltersIcon from "@mui/icons-material/Tune";
import { DATE_KEY_OPTION } from "../../utils/Constants";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

const TimeFilters = props => {
  // Props
  const { selectedFromDate, selectedToDate, handleDateChange } = props;
  // Translation hook
  const { t } = useTranslation();

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
      <div>
        <div
          key="time-picker"
          size="small"
          label={t("From date")}
          value={selectedFromDate}
          onChange={handleFromDateChange}
          format={DATE_TIME_FORMAT}
        />
        <div
          key="time-picker2"
          size="small"
          label={t("To date")}
          value={selectedToDate}
          onChange={handleToDateChange}
          format={DATE_TIME_FORMAT}
        />
      </div>
    </FiltersIcon>
  );
};

export default TimeFilters;
