import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayIcon from "@mui/icons-material/Today";
import { PopperButtonBase } from "../../../HomeMenu/HomeMenu";
import { DATE_KEY_OPTION } from "../../utils/Constants";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

const TimeFilters = props => {
  // Props
  const { selectedFromDate, selectedToDate, handleDateChange } = props;
  // Translation hook
  const { t } = useTranslation();
  const openState = useState(false);
  const [ open ] = openState;

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

  return (<PopperButtonBase
    id="settings"
    Icon={TodayIcon}
    className={!selectedFromDate || !selectedToDate ? "active" : ""}
    openState={openState}
  >
    {/* From -> To Date */}
    <div className="background-gray-dark pad vertical display-none">
      <DatePicker
        key="time-picker"
        size="small"
        type="datetime-local"
        label={t("From date")}
        value={selectedFromDate}
        onChange={handleFromDateChange}
        format={DATE_TIME_FORMAT}
      />
      <DatePicker
        key="time-picker2"
        size="small"
        type="datetime-local"
        label={t("To date")}
        value={selectedToDate}
        onChange={handleToDateChange}
        format={DATE_TIME_FORMAT}
      />
    </div>
  </PopperButtonBase>
  );
};

export default TimeFilters;
