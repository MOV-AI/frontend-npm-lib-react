//========================================================================================
/*                                                                                      *
 *             This independent component uses callback: monitoringTool.api             *
 *                                                                                      */
//========================================================================================

import React, { Component } from "react";
import RobotFlowBar from "./RobotFlowBar/RobotFlowBar";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import "./MonitoringTool.css";
import MasterDB from "../../api/MasterDB";
import NodesTreeTable from "./NodesTreeTable/NodesTreeTable";
import lodashIsEqual from "lodash.isequal";
import {
  getRequestLevels,
  findsUniqueKey,
  getRequestTags,
  getRequestMessage,
  filterByFromToDates
} from "./utils/Utils";
import LogsTable from "./LogsTable/LogsTable";
import ResizePanel from "react-resize-panel";
import ReactResizeDetector from "react-resize-detector";

class MonitoringTool extends Component {
  state = {
    robotSelected: { Name: "Default", IP: "127.0.0.1" },
    flowSelected: "",
    levels: ["INFO", "WARNING", "DEBUG", "ERROR", "CRITICAL"],
    limit: 100,
    logsData: [],
    tags: [],
    messageRegex: "",
    selectedFromDate: null,
    selectedToDate: null,
    columns: ["Time", "Level", "Module", "Function", "Message"],
    height: 0 //LogsTable height
  };
  logsInterval = undefined;
  listKey = 0;

  resizeHandler() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  // componentDidMount() {
  //   this.resizeHandler();
  // }

  componentWillUnmount() {
    if (this.logsInterval) {
      clearInterval(this.logsInterval);
    }
  }

  changeSelectedRobot = robotSelected => {
    if (this.logsInterval) {
      clearInterval(this.logsInterval);
    }

    this.setState({ robotSelected });

    this.logsInterval = setInterval(() => {
      MasterDB.get(
        `http://${robotSelected.IP}/api/v1/logs/?${getRequestLevels(
          this.state.levels
        )}&limit=${this.state.limit}${getRequestTags(
          this.state.tags
        )}${getRequestMessage(this.state.messageRegex)}`,
        (res, e) => {
          if (res === undefined) {
            clearInterval(this.logsInterval);
          } else {
            if (!lodashIsEqual(this.state.logsData, res.data)) {
              this.listKey++;
              this.setState({ logsData: res.data });
            }
          }
        }
      );
    }, 2000);
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
        <ResizePanel direction="s" style={{ height: "100%" }}>
          <ReactResizeDetector
            handleHeight
            onResize={() => this.resizeHandler()}
          >
            {() => (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "800px"
                }}
              >
                <RobotFlowBar
                  robotSelected={this.state.robotSelected.Name}
                  setRobotSelected={this.changeSelectedRobot}
                  flowSelected={this.state.flowSelected}
                  setFlowSelected={flow =>
                    this.setState({ flowSelected: flow })
                  }
                ></RobotFlowBar>
                <div
                  style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    minHeight: 0
                  }}
                >
                  <NodesTreeTable
                    flowSelected={this.state.flowSelected}
                    robotSelected={this.state.robotSelected}
                  ></NodesTreeTable>
                </div>
              </div>
            )}
          </ReactResizeDetector>
        </ResizePanel>

        <div
          style={{
            flexGrow: "1",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <LogsFilterBar
            levels={this.state.levels}
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
            handleColumns={event =>
              this.setState({ columns: event.target.value })
            }
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
              logsData={filterByFromToDates(
                this.state.logsData,
                this.state.selectedFromDate,
                this.state.selectedToDate
              )}
              height={this.state.height}
            ></LogsTable>
          </div>
        </div>
      </div>
    );
  }
  static getComponentFactory() {
    return otherProps => <MonitoringTool {...otherProps} />;
  }
}

export default MonitoringTool;
