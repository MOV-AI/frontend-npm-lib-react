import React, { memo } from "react";
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
    marginTop: 6
  },
  iconButton: {
    color: "#0B6A8A",
    "&:hover": {
      color: "#22c7ff"
    }
  }
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
      <div className={classes.toggleContainer}>
        <svg
          width="20"
          height="18"
          viewBox="0 0 30 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ paddingTop: "5px", paddingRight: "5px" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.7753 1.35706L15.9587 2.61119L16.3648 2.87846L18.4001 4.18898L17.1052 6.20016H25.437C26.5487 6.20016 27.45 7.10137 27.45 8.21307V12.8244H28.0955C28.6514 12.8244 29.102 13.275 29.102 13.8308V16.0643C29.102 16.6201 28.6514 17.0707 28.0955 17.0707H27.45V21.2901C27.45 22.4018 26.5487 23.303 25.437 23.303H4.12161C3.00991 23.303 2.1087 22.4017 2.1087 21.29V17.0707H1.42467C0.868819 17.0707 0.418213 16.6201 0.418213 16.0643V13.8308C0.418213 13.275 0.868819 12.8244 1.42467 12.8244H2.1087V8.21307C2.1087 7.10137 3.00991 6.20016 4.12161 6.20016H13.5141L14.8252 4.16395L13.2875 3.15192L13.2966 3.13812L13.2875 3.1322L15.1377 0.290771L16.7753 1.35706ZM24.4306 9.21953H5.12807V20.2836H24.4306V9.21953ZM7.18098 12.1324C6.68518 12.1324 6.28325 12.5343 6.28325 13.0301C6.28325 13.5259 6.68518 13.9278 7.18098 13.9278H9.04635C9.54216 13.9278 9.94409 13.5259 9.94409 13.0301C9.94409 12.5343 9.54216 12.1324 9.04635 12.1324H7.18098ZM20.6901 12.1324C20.1943 12.1324 19.7924 12.5343 19.7924 13.0301C19.7924 13.5259 20.1943 13.9278 20.6901 13.9278H22.5555C23.0513 13.9278 23.4532 13.5259 23.4532 13.0301C23.4532 12.5343 23.0513 12.1324 22.5555 12.1324H20.6901ZM9.17669 17.6512H11.3239V19.253H9.17669V17.6512ZM14.3432 17.6513H12.196V19.253H14.3432V17.6513ZM15.2154 17.6513H17.3626V19.253H15.2154V17.6513ZM20.382 17.6513H18.2348V19.253H20.382V17.6513ZM10.9568 23.69H18.6019V25.7029C18.6019 26.2587 18.1513 26.7093 17.5954 26.7093H11.9632C11.4074 26.7093 10.9568 26.2587 10.9568 25.7029V23.69Z"
            fill="#9E9E9E"
          />
        </svg>
        <FormControl className={classes.formControl}>
          <Select
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
            MenuProps={MenuProps}
          >
            {/* <MenuItem key={`robotList-Default`} value={robotDefault}>
              Default
            </MenuItem> */}
            {props.selectedRobots.map((robot, robotIndex) => {
              return (
                <MenuItem key={`robotList-${robotIndex}`} value={robot.id}>
                  <Checkbox checked={robot.isSelected} />
                  <ListItemText primary={robot.name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  };

  const getSearchInput = () => {
    return (
      <TextField
        className={classes.searchText}
        label=""
        placeholder="Search (regex)"
        value={props.messageRegex}
        onChange={evt => props.handleMessageRegex(evt.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{ paddingRight: 8 }}>
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={!props.messageRegex}
                onClick={() => props.handleMessageRegex("")}
              >
                <ResetSearch color="inherit" fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }}
        size="small"
      />
    );
  };

  const getLevels = () => {
    return (
      <div className={classes.toggleContainer}>
        <FormControl className={classes.formControl}>
          <Select
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
                <Checkbox checked={props.levels.indexOf(level.value) > -1} />
                <ListItemText primary={level.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const getServices = () => {
    return (
      <div className={classes.toggleContainer}>
        <FormControl className={classes.formControl}>
          <Select
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
                  checked={props.selectedService.indexOf(service.value) > -1}
                />
                <ListItemText primary={service.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const getTags = isAdvancedMode => {
    return (
      <FiltersIcon
        icon={<LabelIcon></LabelIcon>}
        title="Tags"
        disabled={!isAdvancedMode}
        isActive={props.tags.length > 0}
      >
        <div className={classes.tagsContainer}>
          <TextField
            className={classes.addTagText}
            value={tagText}
            onChange={evt => setTagText(evt.target.value)}
            onKeyUp={event => {
              // User pressed Enter
              if (event.keyCode === 13) {
                props.handleAddTag(tagText);
                setTagText("");
              }
            }}
            label="Add Tag"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
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
                <li key={data.key}>
                  <Chip
                    label={data.label}
                    onDelete={() => props.handleDeleteTag(data)}
                    className={classes.chip}
                    size="small"
                  />
                </li>
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

  const getRenderValue = selected => {
    const labels = props.serviceList
      .filter(service => selected.includes(service.value))
      .map(elem => elem.label);
    return labels.join(", ");
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
            // label="limit"
            placeholder={props.t("limit")}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            // variant="outlined"
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
      <Toolbar variant="dense">
        {getRobotSelector()}
        {/* Search Input */}
        {getSearchInput()}
        {/* Toggle: INFO, DEBUG, ERROR, CRITICAL */}
        {getLevels()}
        {/* Toggle: BACKEND, SPAWNER */}
        {getServices()}
        {/* Tags */}
        {getTags(props.advancedMode)}
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
