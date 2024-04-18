import React, { useCallback } from "react";
import i18n from "i18next";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TodayIcon from "@mui/icons-material/Today";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { logsSub } from "../../sub";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

const TimeFilters = () => {
  const { selectedFromDate, selectedToDate } = logsSub.use();

  const handleFromDateChange = useCallback(
    newDate => logsSub.update(newDate, "selectedFromDate"),
    []
  );

  const handleToDateChange = useCallback(
    newDate => logsSub.update(newDate, "selectedToDate"),
    []
  );

  return (
    <FiltersIcon
      icon={<TodayIcon />}
      title={i18n.t("Date Range")}
      isActive={!selectedFromDate || !selectedToDate}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          key="time-picker"
          size="small"
          variant="inline"
          ampm={false}
          label={i18n.t("From date")}
          value={selectedFromDate}
          onChange={handleFromDateChange}
          format={DATE_TIME_FORMAT}
        />
        <DateTimePicker
          key="time-picker2"
          size="small"
          variant="inline"
          ampm={false}
          label={i18n.t("To date")}
          value={selectedToDate}
          onChange={handleToDateChange}
          format={DATE_TIME_FORMAT}
        />
      </LocalizationProvider>
    </FiltersIcon>
  );
};

export default TimeFilters;
