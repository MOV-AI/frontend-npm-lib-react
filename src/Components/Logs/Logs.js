import React, { Component } from "react";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import "./Logs.css";
import { MasterDB } from "mov-fe-lib-core";
import {
  getRequestLevels,
  getRequestTags,
  getRequestMessage,
  filterByFromToDates,
  findsUniqueKey,
  getJustDateFromServer,
  getJustTimeFromServer
} from "./utils/Utils";
import LogsTable from "./LogsTable/LogsTable";
import { _isEqual } from "lodash/isEqual";
import PropTypes from "prop-types";

class Logs extends Component {
  state = {
    selectedRobots: [],
    levels: ["INFO", "ERROR"],
    limit: 10,
    logsData: [],
    messageRegex: "",
    selectedFromDate: null,
    selectedToDate: null,
    columns: ["Time", "Robot", "Message"],
    tags: [{ key: 0, label: "ui" }],
    height: 0, //LogsTable height
    levelsList: [
      { value: "INFO", label: "Robot Status" },
      { value: "ERROR", label: "Alerts" }
    ]
  };
  logsTimeout = undefined;

  simpleLevelsList = [
    { value: "INFO", label: "Robot Status" },
    { value: "ERROR", label: "Alerts" }
  ];

  advancedLevelsList = [
    { value: "INFO", label: "Info" },
    { value: "WARNING", label: "Warnings" },
    { value: "DEBUG", label: "Debug" },
    { value: "ERROR", label: "Error" },
    { value: "CRITICAL", label: "Critical" }
  ];

  resizeHandler() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  componentDidMount() {
    this.setSelectedRobots(
      this.props.robotsData.map(elem => ({ ...elem, isSelected: true }))
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (_isEqual(prevProps.robotsData, this.props.robotsData)) return;
    this.setSelectedRobots(
      this.props.robotsData.map(elem => ({ ...elem, isSelected: true }))
    );
  }

  componentWillUnmount() {
    if (this.logsTimeout) {
      clearTimeout(this.logsTimeout);
    }
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
    this.setState({ selectedRobots });
    this.getLogs(selectedRobots);
  };

  getLogs = async robots => {
    await Promise.all(
      robots
        .filter(robot => robot.robotState !== this.props.robotStates.off) // If robot is offline doesn't bother making the request
        .filter(robot => robot.isSelected)
        .map(robot => this.getRobotLogData(robot))
    ).then(dataArrays => {
      this.setState(prevState => {
        const finalArray = dataArrays.reduce((all, dataArray) => {
          dataArray && dataArray.forEach(data => all.push(data));
          return all;
        }, []);
        this.logsTimeout = setTimeout(
          this.getLogs,
          3000,
          prevState.selectedRobots
        );
        return { logsData: finalArray.sort((a, b) => b.time - a.time) };
      });
    });
  };

  getRobotLogData = robotSelected => {
    return new Promise((re, rej) => {
      // Failsafe timer to prevent the promise all from hanging
      const timeoutHandle = setTimeout(() => {
        console.error("MOV.AI: One of the promises reached timeout");
        re([]);
      }, 2000);

      const dynamicURL = `http://${
        robotSelected.ip
      }/api/v1/logs/?${getRequestLevels(
        this.state.levels,
        this.state.levelsList
      )}&limit=${this.state.limit}${getRequestTags(
        this.state.tags
      )}${getRequestMessage(this.state.messageRegex)}`;

      MasterDB.get(dynamicURL, (res, e) => {
        if (res === undefined) rej();
        re(res.data);
        clearTimeout(timeoutHandle);
      });
    }).catch(() => console.log("Failed getRobotLogData"));
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            flexGrow: "1",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <LogsFilterBar
            selectedRobots={this.state.selectedRobots}
            updateRobotSelection={this.updateRobotSelection}
            levels={this.state.levels}
            levelsList={this.state.levelsList}
            handleLevels={event => {
              this.setState({ levels: event.target.value });
            }}
            limit={this.state.limit}
            handleLimit={evt => {
              if (evt.target.value === "") {
                this.setState({ limit: 0 });
              } else {
                this.setState({ limit: evt.target.value });
              }
            }}
            columns={this.state.columns}
            columnList={this.props.columnList}
            handleColumns={event => {
              this.setState({ columns: event.target.value });
            }}
            tags={this.state.tags}
            handleAddTag={tagText => {
              const { tags } = this.state;
              // Don't add tag if it's empty or duplicate
              if (
                tagText !== "" &&
                tags.findIndex(elem => elem.label === tagText) < 0
              ) {
                tags.push({
                  key: findsUniqueKey(tags, "key"),
                  label: tagText
                });
                this.setState({ tags });
              }
            }}
            handleDeleteTag={tagToDelete => {
              const { tags } = this.state;
              const filteredTags = tags.filter(
                tag => tag.key !== tagToDelete.key
              );
              this.setState({ tags: filteredTags });
            }}
            messageRegex={this.state.messageRegex}
            handleMessageRegex={text => this.setState({ messageRegex: text })}
            selectedFromDate={this.state.selectedFromDate}
            selectedToDate={this.state.selectedToDate}
            handleDateChange={(newDate, keyToChange) => {
              this.setState({ [keyToChange]: newDate });
            }}
            advancedMode={this.state.advancedMode}
            handleAdvancedMode={evt => {
              // Toggle advanced mode, set tag to ui by default and change the levels
              this.setState({
                advancedMode: !this.state.advancedMode,
                levelsList: this.state.advancedMode
                  ? this.simpleLevelsList
                  : this.advancedLevelsList,
                tags: this.state.advancedMode
                  ? [{ key: 0, label: "ui" }]
                  : this.state.tags
              });
            }}
          ></LogsFilterBar>
          <div
            ref={divElement => {
              this.divElement = divElement;
            }}
            style={{
              flexGrow: 1,
              overflowY: "auto",
              minHeight: 0,
              height: "1px"
            }}
          >
            <LogsTable
              columns={this.state.columns}
              columnList={this.props.columnList}
              logsData={filterByFromToDates(
                this.state.logsData,
                this.state.selectedFromDate,
                this.state.selectedToDate
              )}
              height={this.state.height}
              levelsList={this.state.levelsList}
            ></LogsTable>
          </div>
        </div>
      </div>
    );
  }
}

Logs.propTypes = {
  robotsData: PropTypes.array,
  robotStates: PropTypes.object,
  columnList: PropTypes.object
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
  }
};

export default Logs;
