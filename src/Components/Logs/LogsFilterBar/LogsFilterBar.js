import React, { useMemo, memo } from "react";
import PropTypes from "prop-types";
import { AppBar, IconButton, Tooltip } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import _isEqual from "lodash/isEqual";
// Sub-Components
import SearchInput from "./sub-components/SearchInput";
import TagsPopover from "./sub-components/TagsPopover";
import TimeFilters from "./sub-components/TimeFilters";
import SettingsPopover from "./sub-components/SettingsPopover";
import i18n from "i18next";
// Styles
import { useLogFilterStyles, useRobotSelectorStyles } from "../styles";
import { MENU_PROPS } from "./sub-components/_shared/Constants";
import { LEVELS_LABEL } from "./../utils/Constants";
import { CONSTANTS } from "@mov-ai/mov-fe-lib-core";
import useSelector from "./useSelector";

const EMPTY_FUNCTION = () => {
  /** Empty on purpose */
};

const LogsFilterBar = (props) => {
  const { filters, setFilters, handleExport, hide } = props;
  const classes = useLogFilterStyles();
  const { robots } = filters;
  const robotsLabel = useMemo(
    () => Object.keys(robots).reduce((a, key) => ({ ...a, [key]: key }), {}),
    [robots],
  );
  const robotSelector = useSelector(
    filters,
    setFilters,
    robotsLabel,
    "robots",
    MENU_PROPS,
    useRobotSelectorStyles,
  );
  const levelSelector = useSelector(
    filters,
    setFilters,
    LEVELS_LABEL,
    "levels",
    MENU_PROPS,
  );
  const serviceSelector = useSelector(
    filters,
    setFilters,
    CONSTANTS.SERVICE_LABEL,
    "service",
    MENU_PROPS,
  );
  const items = useMemo(
    () =>
      Object.entries({
        robots: robotSelector,
        message: <SearchInput filters={filters} setFilters={setFilters} />,
        levels: levelSelector,
        service: serviceSelector,
        tags: <TagsPopover filters={filters} setFilters={setFilters} />,
        time: <TimeFilters filters={filters} setFilters={setFilters} />,
      })
        .filter(([key]) => !hide[key])
        .map(([_key, value]) => value),
    [robotSelector, levelSelector, serviceSelector, classes, handleExport],
  );

  return (
    <AppBar position="static" color="inherit" className={classes.root}>
      {items}
      <Tooltip title={i18n.t("Download logs")}>
        <IconButton
          onClick={handleExport}
          classes={{ root: classes.marginLeftAuto }}
        >
          <GetAppIcon />
        </IconButton>
      </Tooltip>
      <SettingsPopover filters={filters} setFilters={setFilters} />
    </AppBar>
  );
};

LogsFilterBar.propTypes = {
  handleExport: PropTypes.func,
  hide: PropTypes.shape({
    robots: PropTypes.bool,
    message: PropTypes.bool,
    service: PropTypes.bool,
    tags: PropTypes.bool,
    time: PropTypes.bool,
  }),
};

LogsFilterBar.defaultProps = {
  handleExport: EMPTY_FUNCTION,
  hide: {},
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return _isEqual(prevProps, nextProps);
}

export default memo(LogsFilterBar, arePropsEqual);
