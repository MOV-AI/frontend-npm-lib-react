import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import _isEqual from "lodash/isEqual";
import _uniqWith from "lodash/uniqWith";
import { MasterDB } from "@mov-ai/mov-fe-lib-core";
import { withStyles } from "@material-ui/core/styles";
import RobotLogModal from "../Modal/RobotLogModal";
import {
  getRequestDate,
  getRequestLevels,
  getRequestService,
  getRequestTags,
  getRequestMessage,
  findsUniqueKey,
  getJustDateFromServer,
  getJustTimeFromServer
} from "./utils/Utils";
import LogsTable from "./LogsTable/LogsTable";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import "./Logs.css";
import {
  ADVANCED_LEVELS_LIST,
  DEFAULT_LIMIT,
  DEFAULT_SELECTED_COLUMNS,
  DEFAULT_SELECTED_LEVELS,
  DEFAULT_SELECTED_SERVICES,
  ROBOT_LOG_TYPE,
  SERVICE_LIST,
  SIMPLE_LEVELS_LIST
} from "./utils/Constants";
import LogsSkeleton from "./LogsSkeleton";
import { Typography } from "@material-ui/core";
import i18n from "../../i18n/i18n";

const UI_TAG = { key: 0, label: "ui" };

const styles = theme => ({
  tableContainer: {
    flexGrow: 1,
    minHeight: 0,
    overflow: "hidden"
  },
  externalDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  noRows: {
    display: "flex",
    fontSize: "20px",
    justifyContent: "center",
    padding: "32px"
  },
  wrapper: {
    flexGrow: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
});

class Logs extends Component {
  state = {
    selectedRobots: [],
    levels: DEFAULT_SELECTED_LEVELS,
    limit: DEFAULT_LIMIT,
    logsData: [],
    messageRegex: "",
    requestManuallyChanged: false,
    requestTimestamp: null,
    selectedFromDate: null,
    selectedToDate: null,
    columns: DEFAULT_SELECTED_COLUMNS,
    tags: this.props.advancedMode ? [] : [UI_TAG],
    height: 0, //LogsTable height
    levelsList: this.props.advancedMode
      ? ADVANCED_LEVELS_LIST
      : SIMPLE_LEVELS_LIST,
    selectedService: DEFAULT_SELECTED_SERVICES,
    serviceList: SERVICE_LIST,
    advancedMode: this.props.advancedMode,
    loading: true
  };
  logsTimeout = 0;
  logModal = createRef();

  resizeHandler() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  componentDidMount() {
    this.updateSelectedRobots();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.queryParameterChanged(prevState)) {
      this.setState({
        requestManuallyChanged: true,
        loading: true,
        requestTimestamp: this.state.selectedFromDate,
        logsData: []
      });

      if (!this.logsTimeout) this.getLogs(prevState.selectedRobots);
    }
    if (_isEqual(prevProps.robotsData, this.props.robotsData)) return;
    this.updateSelectedRobots();
  }

  resetLogsTimeout = () => {
    clearTimeout(this.logsTimeout);
    this.logsTimeout = null;
  };

  updateSelectedRobots = () => {
    if (
      this.props.robotsData.length &&
      this.props.robotsData.filter(robot => robot.ip).length
    )
      this.setSelectedRobots(
        this.props.robotsData.map(elem => ({ ...elem, isSelected: true }))
      );
  };

  componentWillUnmount() {
    if (!!this.logsTimeout) {
      clearTimeout(this.logsTimeout);
    }
  }

  queryParameterChanged(prevState) {
    const fromDateChanged =
      prevState.selectedFromDate !== this.state.selectedFromDate;

    const toDateChanged =
      prevState.selectedToDate !== this.state.selectedToDate;

    const levelsChanged = prevState.levels !== this.state.levels;
    const limitChanged = prevState.limit !== this.state.limit;

    const selectedServiceChanged =
      prevState.selectedService !== this.state.selectedService;

    const messageRegexChanged =
      prevState.messageRegex !== this.state.messageRegex;
    return (
      fromDateChanged ||
      toDateChanged ||
      selectedServiceChanged ||
      messageRegexChanged ||
      limitChanged ||
      levelsChanged
    );
  }

  // This function is responsible to check/unckeck the list of robots
  updateRobotSelection = robotId => {
    const selectedRobots = [...this.state.selectedRobots];
    const updateRobot =
      selectedRobots[selectedRobots.findIndex(elem => elem.id === robotId)];
    updateRobot.isSelected = !updateRobot.isSelected;
    this.setState({ selectedRobots });
  };

  setSelectedRobots = selectedRobots => {
    this.resetLogsTimeout();
    this.setState({ selectedRobots });
    this.getLogs(selectedRobots);
  };

  getLogs = async robots => {
    await Promise.all(
      robots
        .filter(robot => robot.robotState !== this.props.robotStates.off) // If robot is offline doesn't bother making the request
        .filter(robot => robot.isSelected)
        .map(robot => this.getRobotLogData(robot))
    ).then(this.updateLogs);
  };

  updateLogs = robotLogs => {
    const newLogs = robotLogs.reduce((storedLogs, robotLogArray) => {
      return [...storedLogs, ...(robotLogArray || [])];
    }, []);

    this.setState(prevState => {
      const logsData = _uniqWith([...prevState.logsData, ...newLogs], _isEqual)
        .sort((a, b) => b.time - a.time)
        .slice(0, this.state.limit);

      if (this.state.requestManuallyChanged) {
        this.resetLogsTimeout();
        this.getLogs(prevState.selectedRobots);
      } else {
        if (
          !(
            this.state.selectedToDate &&
            this.state.selectedToDate < this.state.requestTimestamp
          )
        ) {
          this.setState({ requestTimestamp: new Date() }, () => {
            this.logsTimeout = setTimeout(
              this.getLogs,
              3000,
              prevState.selectedRobots
            );
          });
        }
      }

      return {
        logsData,
        requestManuallyChanged: false,
        loading: false
      };
    });
  };

  getRobotLogData = robotSelected => {
    return new Promise((re, rej) => {
      // Failsafe timer to prevent the promise all from hanging
      const timeoutHandle = setTimeout(() => {
        console.error("MOV.AI: One of the promises reached timeout");
        re([]);
      }, 2000);

      if (robotSelected.name) {
        const protocol = window.location.protocol;
        const host = window.location.hostname;
        const dynamicURL = `${protocol}//${host}/api/v1/logs/${
          robotSelected.name
        }?limit=${this.state.limit}${getRequestLevels(
          this.state.levels,
          this.state.levelsList
        )}${getRequestService(
          this.state.selectedService,
          this.state.serviceList
        )}${getRequestDate(
          this.state.requestTimestamp || "",
          this.state.selectedToDate || ""
        )}${getRequestTags(this.state.tags)}${getRequestMessage(
          this.state.messageRegex
        )}`;

        MasterDB.get(dynamicURL, (res, e) => {
          re(res?.data || []);
          clearTimeout(timeoutHandle);
        });
      } else {
        re([]);
      }
    }).catch(() => console.log("Failed getRobotLogData"));
  };

  onRowClick = log => {
    this.logModal.current.open(log.rowData);
  };

  handleSelectedService = event => {
    this.setState({ selectedService: event.target.value });
  };

  getHandleLevels = event => {
    this.setState({ levels: event.target.value });
  };

  getHandleLimit = event => {
    let limit = DEFAULT_LIMIT;

    if (event.target.value !== "") limit = event.target.value;

    this.setState({ limit });
  };

  getHandleColumns = event => {
    // make sure columns are always with the same order
    const columns = Object.keys(this.props.columnList).filter(elem =>
      event.target.value.includes(elem)
    );
    this.setState({ columns });
  };

  getHandleDateChange = (newDate, keyToChange) => {
    this.setState({ [keyToChange]: newDate });
  };

  getHandleAdvancedMode = () => {
    // Toggle advanced mode: change the levels
    const advancedMode = !this.state.advancedMode;
    let levelsList = this.SIMPLE_LEVELS_LIST;
    let tags = [UI_TAG];

    if (advancedMode) {
      levelsList = this.ADVANCED_LEVELS_LIST;
      tags = [];
    }

    this.setState({
      advancedMode,
      levelsList,
      tags
    });
  };

  handleContainerRef = divElement => {
    this.divElement = divElement;
  };

  handleNoRows = () => {
    return (
      <Typography variant="h2">
        {this.state.loading ? (
          <LogsSkeleton></LogsSkeleton>
        ) : (
          <div className={this.props.classes.noRows}>
            {i18n.t("No matches found")}
          </div>
        )}
      </Typography>
    );
  };

  getHandleMessageRegex = text => this.setState({ messageRegex: text });

  addTag = tagText => {
    const { tags } = this.state;
    // Don't add tag if it's empty or duplicate
    if (tagText !== "" && tags.findIndex(elem => elem.label === tagText) < 0) {
      tags.push({
        key: findsUniqueKey(tags, "key"),
        label: tagText
      });
      this.setState({ tags });
    }
  };

  deleteTag = tagToDelete => {
    const { tags } = this.state;
    const filteredTags = tags.filter(tag => tag.key !== tagToDelete.key);
    this.setState({ tags: filteredTags });
  };

  render() {
    return (
      <div className={this.props.classes.externalDiv}>
        <div className={this.props.classes.wrapper}>
          <LogsFilterBar
            selectedRobots={this.state.selectedRobots}
            updateRobotSelection={this.updateRobotSelection}
            levels={this.state.levels}
            levelsList={this.state.levelsList}
            handleLevels={this.getHandleLevels}
            selectedService={this.state.selectedService}
            serviceList={this.state.serviceList}
            handleSelectedService={this.handleSelectedService}
            limit={this.state.limit}
            handleLimit={this.getHandleLimit}
            columns={this.state.columns}
            columnList={this.props.columnList}
            handleColumns={this.getHandleColumns}
            tags={this.state.tags}
            handleAddTag={this.addTag}
            handleDeleteTag={this.deleteTag}
            messageRegex={this.state.messageRegex}
            handleMessageRegex={this.getHandleMessageRegex}
            selectedFromDate={this.state.selectedFromDate}
            selectedToDate={this.state.selectedToDate}
            handleDateChange={this.getHandleDateChange}
            advancedMode={this.state.advancedMode}
            handleAdvancedMode={this.getHandleAdvancedMode}
          ></LogsFilterBar>
          <div
            ref={this.handleContainerRef}
            className={this.props.classes.tableContainer}
          >
            <LogsTable
              columns={this.state.columns}
              columnList={this.props.columnList}
              logsData={this.state.logsData}
              height={this.state.height}
              levelsList={this.state.levelsList}
              onRowClick={this.onRowClick}
              noRowsRenderer={this.handleNoRows}
            ></LogsTable>
          </div>
        </div>
        <RobotLogModal
          ref={this.logModal}
          props={ROBOT_LOG_TYPE}
        ></RobotLogModal>
      </div>
    );
  }
}

Logs.propTypes = {
  robotsData: PropTypes.array,
  robotStates: PropTypes.object,
  columnList: PropTypes.object,
  advancedMode: PropTypes.bool
};
Logs.defaultProps = {
  robotsData: [
    {
      name: "robot",
      id: "032cf6207ff34ad0a68cc45034f61b41",
      timestamp: 1604334778.6494586,
      robotState: "okay",
      battery: 78,
      ip: "127.0.0.1"
    },
    {
      name: "robot_test",
      id: "4df900e30cb44adba33ae74bb2596d88",
      timestamp: 1603969723.997914,
      robotState: "off",
      battery: 22,
      ip: "127.0.0.1"
    }
  ],
  robotStates: {
    error: "error",
    temp: "temp",
    okay: "okay",
    off: "off"
  },
  columnList: {
    Date: {
      label: "Date",
      dataKey: "time",
      width: 100,
      render: time => getJustDateFromServer(time)
    },
    Time: {
      label: "Time",
      dataKey: "time",
      width: 100,
      render: time => getJustTimeFromServer(time)
    },
    Level: {
      label: "Level",
      dataKey: "level",
      width: 100
    },
    Module: {
      label: "Module",
      dataKey: "module",
      width: 100
    },
    Robot: {
      label: "Robot",
      dataKey: "robot",
      width: 100
    },
    Message: {
      label: "Message",
      dataKey: "message",
      width: 100
    }
  },
  advancedMode: false
};

export default withStyles(styles, { withTheme: true })(Logs);
