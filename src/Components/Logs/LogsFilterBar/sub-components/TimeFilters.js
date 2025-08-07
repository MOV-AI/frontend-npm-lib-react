import React, { useCallback } from "react";
import i18n from "../../../../i18n";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TodayIcon from "@material-ui/icons/Today";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { logsSub } from "../../sub";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

const TimeFilters = () => {
  const { selectedFromDate, selectedToDate } = logsSub.use();

  const handleFromDateChange = useCallback(
    (newDate) => logsSub.set("selectedFromDate", newDate),
    [],
  );

  const handleToDateChange = useCallback(
    (newDate) => logsSub.set("selectedToDate", newDate),
    [],
  );

  return (
    <FiltersIcon
      icon={<TodayIcon />}
      title={i18n.t("Date Range")}
      isActive={!selectedFromDate || !selectedToDate}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          key="time-picker"
          size="small"
          variant="inline"
          ampm={false}
          label={i18n.t("From date")}
          value={selectedFromDate}
          onChange={handleFromDateChange}
          format={DATE_TIME_FORMAT}
        />
        <KeyboardDateTimePicker
          key="time-picker2"
          size="small"
          variant="inline"
          ampm={false}
          label={i18n.t("To date")}
          value={selectedToDate}
          onChange={handleToDateChange}
          format={DATE_TIME_FORMAT}
        />
      </MuiPickersUtilsProvider>
    </FiltersIcon>
  );
};

export default TimeFilters;
