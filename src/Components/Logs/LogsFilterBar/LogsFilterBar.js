import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  FormControlLabel,
  Switch,
  TextField,
  Toolbar
} from "@material-ui/core";
import ResetSearch from "@material-ui/icons/Close";
import FiltersIcon from "./FiltersIcon/FiltersIcon";
import LabelIcon from "@material-ui/icons/Label";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import TodayIcon from "@material-ui/icons/Today";
import { Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import TuneIcon from "@material-ui/icons/Tune";
import Checkbox from "@material-ui/core/Checkbox";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import _isEqual from "lodash/isEqual";
import _get from "lodash/get";

const useStyles = makeStyles(theme => ({
  input: {
    flex: 1,
    paddingLeft: "10px",
    fontSize: "medium"
  },
  searchText: {
    minWidth: 150,
    paddingLeft: theme.spacing(3)
  },
  addTagText: {
    width: "100%"
  },
  limitText: {
    width: "50px",
    margin: theme.spacing(0, 3, 0, 3)
  },
  toggleContainer: {
    margin: theme.spacing(2)
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0.5),
    margin: theme.spacing(0, 3, 0, 3)
  },
  tagsList: {
    marginTop: theme.spacing(3)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  filtersButton: {
    display: "flex",
    flexDirection: "row"
  },
  columnsFilter: {
    display: "flex",
    flexDirection: "column",
    marginTop: "6px"
  },
  iconButton: {
    color: "#0B6A8A",
    "&:hover": {
      color: "#22c7ff"
    }
  },
  iconAdornment: { marginRight: "15px" }
}));

const LogsFilterBar = props => {
  const classes = useStyles();
  const [tagText, setTagText] = React.useState("");

  const handleRobotChange = event => {
    const arrayEvent = event?.target?.value;
    const selectedId = arrayEvent[arrayEvent.length - 1];
    props.updateRobotSelection(selectedId);
  };
  const getRobotSelector = () => {
    return (
      <div
        data-testid="section_robot-selector"
        className={classes.toggleContainer}
      >
        <FormControl className={classes.formControl}>
          <Select
            data-testid="input_change-robot"
            labelId="select-label"
            id="select"
            multiple
            value={props.selectedRobots}
            onChange={handleRobotChange}
            renderValue={selected => {
              const selectedNames = selected
                .filter(({ isSelected }) => isSelected)
                .map(({ name }) => name);
              return selectedNames.length > 2
                ? [selectedNames[0], selectedNames[1]].join(" , ") + "..."
                : selectedNames.join(" , ");
            }}
            input={<Input />}
            startAdornment={
              <i className={`fas fa-robot ${classes.iconAdornment}`}></i>
            }
            MenuProps={MenuProps}
          >
            {props.selectedRobots.map((robot, robotIndex) => {
              return (
                <MenuItem key={`robotList-${robotIndex}`} value={robot.id}>
                  <Checkbox
                    data-testid="output_icon"
                    checked={robot.isSelected}
                  />
                  <ListItemText
                    data-testid="output_label"
                    primary={robot.name}
                  />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  };

  const getSearchInput = () => {
    const { t } = useTranslation();

    return (
      <TextField
        className={classes.searchText}
        placeholder={t("Search")}
        value={props.messageRegex}
        onChange={evt => props.handleMessageRegex(evt.target.value)}
        InputProps={
          ({ "data-testid": "output_search" },
          {
            startAdornment: (
              <InputAdornment
                className={classes.iconAdornment}
                position="start"
              >
                <SearchIcon data-testid="output_icon" fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  data-testid="output_button"
                  disabled={!props.messageRegex}
                  onClick={() => props.handleMessageRegex("")}
                >
                  <ResetSearch color="inherit" fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          })
        }
        size="small"
      />
    );
  };

  const getLevels = () => {
    return (
      <div data-testid="section_levels" className={classes.toggleContainer}>
        <FormControl className={classes.formControl}>
          <Select
            inputProps={{ "data-testid": "input_select" }}
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            style={{ minWidth: "290px" }}
            multiple
            value={props.levels}
            onChange={props.handleLevels}
            input={<Input />}
            renderValue={selected => {
              // selected comes from state, for example ["ERROR", "INFO"]
              // but want to show the lables, for example ["Alerts", "State of Robot"]
              const labels = props.levelsList
                .filter(level => selected.includes(level.value))
                .map(elem => elem.label);
              return labels.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {props.levelsList.map(level => (
              <MenuItem key={level.value} value={level.value}>
                <Checkbox
                  data-testid="output_checkbox"
                  checked={props.levels.indexOf(level.value) > -1}
                />
                <ListItemText
                  data-testid="output_label"
                  primary={level.label}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const getRenderValue = selected => {
    const labels = props.serviceList
      .filter(service => selected.includes(service.value))
      .map(elem => elem.label);
    return labels.join(", ");
  };

  const getServices = () => {
    return (
      <div data-testid="section_services" className={classes.toggleContainer}>
        <FormControl className={classes.formControl}>
          <Select
            inputProps={{ "data-testid": "input_select" }}
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            style={{ minWidth: "290px" }}
            multiple
            value={props.selectedService}
            onChange={props.handleSelectedService}
            input={<Input />}
            renderValue={getRenderValue}
            MenuProps={MenuProps}
          >
            {props.serviceList.map(service => (
              <MenuItem key={service.value} value={service.value}>
                <Checkbox
                  inputProps={{ "data-testid": "input_checkbox" }}
                  checked={props.selectedService.indexOf(service.value) > -1}
                />
                <ListItemText
                  data-testid="output_label"
                  primary={service.label}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const handleKeyUp = event => {
    // User pressed Enter
    if (event.key === 13) {
      props.handleAddTag(tagText);
      setTagText("");
    }
  };

  const handleOnChangeKey = evt => setTagText(evt.target.value);

  const getTagsPopover = () => {
    return (
      <FiltersIcon
        icon={<LabelIcon data-testid="output_icon"></LabelIcon>}
        title="Tags"
        disabled={!props.advancedMode}
        isActive={props.tags.length > 0}
      >
        <div data-testid="section_tags" className={classes.tagsContainer}>
          <TextField
            className={classes.addTagText}
            value={tagText}
            onChange={handleOnChangeKey}
            onKeyUp={handleKeyUp}
            label="Add Tag"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    inputProps={{ "data-testid": "input_button" }}
                    onClick={() => {
                      props.handleAddTag(tagText);
                      setTagText("");
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            size="small"
          />
          <div className={classes.tagsList}>
            {props.tags.map(data => {
              return (
                <Chip
                  data-testid="output_chip"
                  key={data.key}
                  label={data.label}
                  onDelete={() => props.handleDeleteTag(data)}
                  className={classes.chip}
                  size="small"
                />
              );
            })}
          </div>
        </div>
      </FiltersIcon>
    );
  };

  const getTimeFilters = () => {
    return (
      <FiltersIcon
        icon={<TodayIcon></TodayIcon>}
        title={props.t("Date Range")}
        isActive={
          props.selectedFromDate !== null || props.selectedToDate !== null
        }
      >
        {/* From -> To Date */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            key="time-picker"
            size="small"
            variant="inline"
            ampm={false}
            label={props.t("From date")}
            value={props.selectedFromDate}
            onChange={newDate =>
              props.handleDateChange(newDate, "selectedFromDate")
            }
            onError={console.log}
            format="yyyy/MM/dd HH:mm"
          />
          <KeyboardDateTimePicker
            key="time-picker2"
            size="small"
            variant="inline"
            ampm={false}
            label={props.t("To date")}
            value={props.selectedToDate}
            onChange={newDate =>
              props.handleDateChange(newDate, "selectedToDate")
            }
            onError={console.log}
            format="yyyy/MM/dd HH:mm"
          />
        </MuiPickersUtilsProvider>
      </FiltersIcon>
    );
  };

  const getSettings = () => {
    return (
      <FiltersIcon
        icon={<TuneIcon></TuneIcon>}
        title={props.t("Configuration")}
      >
        {/* Advanced/Simple Mode */}
        <FormControlLabel
          control={
            <Switch
              checked={props.advancedMode}
              onChange={props.handleAdvancedMode}
            />
          }
          label={props.advancedMode ? "Advanced" : "Simple"}
        />
        <div className={classes.filtersButton}>
          {/* Limit Input */}
          <Typography
            component="div"
            style={{
              fontSize: "1rem",
              fontFamily: "Open Sans",
              fontWeight: 500
            }}
          >
            {`${props.t("Limit p/Robot")}:`}
          </Typography>
          <TextField
            value={props.limit}
            onChange={props.handleLimit}
            className={classes.limitText}
            id="outlined-number"
            placeholder={props.t("limit")}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{ inputProps: { min: 1 } }}
            size="small"
          />
        </div>
        <div className={classes.columnsFilter}>
          {/* Limit Input */}
          <Typography
            component="div"
            style={{
              fontSize: "1rem",
              fontFamily: "Open Sans",
              fontWeight: 500
            }}
          >
            {`${props.t("Columns")}:`}
          </Typography>
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={props.columns}
              onChange={props.handleColumns}
              input={<Input />}
              renderValue={getRenderValue}
              MenuProps={MenuProps}
            >
              {Object.keys(props.columnList).map((column, index) => {
                return (
                  <MenuItem key={index} value={column}>
                    <Checkbox checked={props.columns.indexOf(column) > -1} />
                    <ListItemText primary={props.columnList[column].label} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </FiltersIcon>
    );
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar data-testid="section_logs-filter-bar" variant="dense">
        {getRobotSelector()}
        {/* Search Input */}
        {getSearchInput()}
        {/* Toggle: INFO, DEBUG, ERROR, CRITICAL */}
        {getLevels()}
        {/* Toggle: BACKEND, SPAWNER */}
        {getServices()}
        {/* Tags */}
        {getTagsPopover()}
        {/* Date time filter */}
        {getTimeFilters()}
        <div style={{ flexGrow: 1 }}></div>
        {getSettings()}
      </Toolbar>
    </AppBar>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null
};

LogsFilterBar.propTypes = {
  levels: PropTypes.array,
  levelsList: PropTypes.array,
  handleLevels: PropTypes.func,
  selectedService: PropTypes.array,
  serviceList: PropTypes.array,
  handleSelectedService: PropTypes.func,
  limit: PropTypes.number,
  handleLimit: PropTypes.func,
  columns: PropTypes.array,
  columnList: PropTypes.object,
  handleColumns: PropTypes.func,
  handleDeleteTag: PropTypes.func,
  messageRegex: PropTypes.string,
  handleMessageRegex: PropTypes.func,
  selectedFromDate: PropTypes.string,
  selectToDate: PropTypes.string,
  handleDateChange: PropTypes.func,
  selectedRobots: PropTypes.array,
  updateRobotSelection: PropTypes.func,
  advancedMode: PropTypes.bool,
  handleAdvancedMode: PropTypes.func,
  t: PropTypes.func
};

LogsFilterBar.defaultProps = {
  levels: [],
  levelsList: [],
  handleLevels: () => {},
  selectedService: [],
  serviceList: [],
  handleSelectedService: () => {},
  limit: 1,
  handleLimit: () => {},
  columns: [],
  columnList: {},
  handleColumns: () => {},
  handleDeleteTag: () => {},
  messageRegex: "",
  handleMessageRegex: () => {},
  selectedFromDate: "",
  selectToDate: "",
  handleDateChange: () => {},
  selectedRobots: [],
  updateRobotSelection: () => {},
  advancedMode: false,
  handleAdvancedMode: () => {},
  t: string => string
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return _isEqual(prevProps, nextProps);
}

export default memo(LogsFilterBar, arePropsEqual);
