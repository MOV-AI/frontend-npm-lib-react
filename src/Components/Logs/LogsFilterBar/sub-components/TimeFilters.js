import React, { useCallback } from "react";
import i18n from "i18next";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TodayIcon from "@mui/icons-material/Today";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";

const DATE_TIME_FORMAT = "yyyy/MM/dd HH:mm";

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

const TimeFilters = (props) => {
  const { filters, setFilters } = props;
  const { selectedFromDate, selectedToDate } = filters;

  const handleFromDateChange = useCallback(
    (newDate) =>
      isValidDate(newDate)
        ? setFilters((oldFilters) => ({
            ...oldFilters,
            selectedFromDate: newDate,
          }))
        : null,
    [setFilters],
  );

  const handleToDateChange = useCallback(
    (newDate) =>
      isValidDate(newDate)
        ? setFilters((oldFilters) => ({
            ...oldFilters,
            selectedToDate: newDate,
          }))
        : null,
    [setFilters],
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
