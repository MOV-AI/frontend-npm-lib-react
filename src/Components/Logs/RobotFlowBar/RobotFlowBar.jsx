import React, { Component } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";
import Database from "../../../api/Database";
import MasterComponent from "../../MasterComponent/MasterComponent";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import StopIcon from "@material-ui/icons/Stop";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import lodashGet from "lodash.get";
import "../MonitoringTool.css";
import Flow from "../../Flow/Flow";

const styles = theme => ({
  barContainer: {
    backgroundColor: "#353535"
  },
  iconButton: {
    color: "#0B6A8A",
    "&:hover": {
      color: "#22c7ff"
    }
  },
  selectContainer: {
    padding: "12px 0px 12px 10px",
    color: "white"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    padding: "0px 6px 0px 6px"
  },
  whichFlowText: {
    marginLeft: theme.spacing(2),
    fontSize: "15px"
  },

  grow: {
    flexGrow: 1
  }
});

class RobotFlowBar extends Component {
  state = {
    robotNameList: [],
    robotIPList: [],
    flowList: [],
    robotDefault: "Default",
    robotStatus: {
      active_flow: "",
      robotOnline: true, //let's assume the default is online
      node_status: {}
    }
  };
  debounceTime = 600; // ms
  debounceDelta = Date.now();
  robotOfflineTime = 8; // sec
  database = new Database();

  //========================================================================================
  /*                                                                                      *
   *                                      Subscribers                                     *
   *                                                                                      */
  //========================================================================================

  allRobotsSubscribe = (callback = () => undefined) => {
    this.database.subscribe(
      {
        Scope: "Robot",
        Name: "*",
        RobotName: "*"
      },
      updateData => {},
      data => {
        console.log("RobotName sub data", data);
        callback();
        if (data.value.Robot !== undefined) {
          this.setState({ robotNameList: data.value.Robot });
        }
      }
    );
    this.database.subscribe(
      {
        Scope: "Robot",
        Name: "*",
        IP: "*"
      },
      updateData => {},
      data => {
        console.log("RobotIP sub data", data);
        callback();
        if (data.value.Robot !== undefined) {
          this.setState({ robotIPList: data.value.Robot });
        }
      }
    );
  };

  allRobotsUnsubscribe = (callback = () => undefined) => {
    this.database.unsubscribe(
      {
        Scope: "Robot",
        Name: "*",
        RobotName: "*"
      },
      callback
    );
    this.database.unsubscribe(
      {
        Scope: "Robot",
        Name: "*",
        IP: "*"
      },
      callback
    );
  };

  robotSubscribe = robotId => {
    this.database.subscribe(
      {
        Scope: "Robot",
        Name: robotId,
        Status: "*"
      },
      updateData => {
        if (updateData.event === "hset") {
          this.updateStatus("key", robotId, updateData);
        }
      },
      data => {
        // Update Flow selector if a flow is already running
        const updateIn = lodashGet(data, `value.Robot[${robotId}].Status`, {});
        this.props.setFlowSelected(updateIn.active_flow);
        this.updateStatus("value", robotId, data);
      }
    );
  };

  robotUnsubscribe = (callback = () => undefined) => {
    if (!!this.props.robotSelected) {
      this.database.unsubscribe(
        {
          Scope: "Robot",
          Name: this.props.robotSelected,
          Status: "*"
        },
        callback
      );
    }
  };

  changeRobotSubscriber = robotId => {
    this.robotUnsubscribe(this.robotSubscribe(robotId));
  };

  allFlowsSubscribe = () => {
    this.database.subscribe(
      {
        Scope: "Flow",
        Name: "*",
        Label: "*"
      },
      updateData => {
        const map = {
          set: () => {
            // When you create a new flow, we must append a new entry do flow List
            const { flowList } = this.state;
            const newFlowLabel = Object.keys(updateData.key.Flow)[0];
            flowList[newFlowLabel] = updateData.key.Flow[newFlowLabel];
            this.setState({ flowList });
          },
          del: () => {
            // When you delete a flow it will delete in the flowList
            const delFlowLabel = Object.keys(updateData.key.Flow)[0];
            const { [delFlowLabel]: _, ...flowList } = this.state.flowList;
            this.setState({ flowList });
          }
        };
        map[updateData.event]();
      },
      data => {
        console.log("Flow sub data", data);
        if (data.value.Flow !== undefined) {
          this.setState({ flowList: data.value.Flow });
        }
      }
    );
  };

  allFlowsUnsubscribe = () => {
    this.database.unsubscribe({
      Scope: "Flow",
      Name: "*",
      Label: "*"
    });
  };

  //========================================================================================
  /*                                                                                      *
   *                                        getters                                       *
   *                                                                                      */
  //========================================================================================

  getRunningRobot = () => {
    try {
      this.database.cloudFunction(
        "backend.FlowTopBar",
        "getDefaultRobot", // function
        "", // args
        (res, e) => {
          const robot = res.result;
          this.props.setRobotSelected({
            Name: robot,
            IP: lodashGet(this.state.robotIPList, `[${robot}].IP`, "127.0.0.1")
          });
          this.setState(
            {
              robotDefault: robot
            },
            this.robotSubscribe(robot)
          );
        }
      );
    } catch (error) {
      MasterComponent.alert(
        "Error running backend.RobotFlowBar callback",
        MasterComponent.ALERTS.error
      );
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                   React Lifecycles                                   *
   *                                                                                      */
  //========================================================================================

  componentDidMount() {
    // Get the list of all the Robots for the selector
    this.allRobotsSubscribe(this.getRunningRobot);
    // Get the list of all the Flows for the second selector
    this.allFlowsSubscribe();
  }

  componentWillUnmount() {
    this.robotUnsubscribe(() => {
      this.allRobotsUnsubscribe(() => {
        this.database.close();
      });
    });
    this.allFlowsUnsubscribe();
  }

  //========================================================================================
  /*                                                                                      *
   *                                   Handler Functions                                  *
   *                                                                                      */
  //========================================================================================

  updateStatus = (key, targetValue, data) => {
    if (Date.now() - this.debounceDelta <= this.debounceTime) return;
    const robotStatus = {
      active_flow: "",
      robotOnline: true,
      node_status: {}
    };
    // If there is hash Status in the key Robot
    const updateIn = lodashGet(
      data,
      `[${key}].Robot[${targetValue}].Status`,
      undefined
    );
    if (updateIn) {
      // Is Online
      if (Date.now() * 0.001 - updateIn.timestamp <= this.robotOfflineTime) {
        robotStatus.robotOnline = true;
        robotStatus.active_flow = updateIn.active_flow;
        updateIn.nodes_lchd.forEach(elem => {
          robotStatus.node_status[elem] = 1;
        });
        // Only sets father state if nodeStatus has changed
        if (
          !isEqual(this.state.robotStatus.node_status, robotStatus.node_status)
        ) {
          // this.props.nodeStatusUpdated(robotStatus.node_status, robotStatus);
        }
        this.setState({ robotStatus });
      }
      // Is Offline
      else {
        if (robotStatus.robotOnline || robotStatus.active_flow !== "") {
          robotStatus.robotOnline = false;
          robotStatus.active_flow = "";
          this.setState({ robotStatus });
        }
        MasterComponent.alert(
          "Robot is offline",
          MasterComponent.ALERTS.warning
        );
      }
    }
    // Robot doesn't have "Status" key in Redis
    else {
      if (robotStatus.robotOnline || robotStatus.active_flow !== "") {
        robotStatus.robotOnline = false;
        robotStatus.active_flow = "";
        this.setState({ robotStatus });
      }
      console.error(
        "Robot has no 'Status' information. File: RobotFlowBar.jsx"
      );
    }
    this.debounceDelta = Date.now();
  };

  // Robot list select change, will unsubscribe from the previous one
  handleRobotChange = event => {
    if (event.target.value !== this.props.robotSelected) {
      this.changeRobotSubscriber(event.target.value);
      this.props.setRobotSelected({
        Name: event.target.value,
        IP: lodashGet(
          this.state.robotIPList,
          `[${event.target.value}].IP`,
          undefined
        )
      });
    }
  };

  // action can be either "START" or "STOP"
  handleClickAction = action => {
    try {
      this.database.cloudFunction(
        "backend.FlowTopBar",
        "sendToRobot", // function
        [action, this.props.flowSelected, this.props.robotSelected], // args
        res => {}
      );
    } catch (error) {
      MasterComponent.alert(
        "Error running monitoringTool.api callback",
        MasterComponent.ALERTS.error
      );
    }
  };

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.barContainer}>
        <Toolbar variant="dense">
          <svg
            width="20"
            height="18"
            viewBox="0 0 30 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.7753 1.35706L15.9587 2.61119L16.3648 2.87846L18.4001 4.18898L17.1052 6.20016H25.437C26.5487 6.20016 27.45 7.10137 27.45 8.21307V12.8244H28.0955C28.6514 12.8244 29.102 13.275 29.102 13.8308V16.0643C29.102 16.6201 28.6514 17.0707 28.0955 17.0707H27.45V21.2901C27.45 22.4018 26.5487 23.303 25.437 23.303H4.12161C3.00991 23.303 2.1087 22.4017 2.1087 21.29V17.0707H1.42467C0.868819 17.0707 0.418213 16.6201 0.418213 16.0643V13.8308C0.418213 13.275 0.868819 12.8244 1.42467 12.8244H2.1087V8.21307C2.1087 7.10137 3.00991 6.20016 4.12161 6.20016H13.5141L14.8252 4.16395L13.2875 3.15192L13.2966 3.13812L13.2875 3.1322L15.1377 0.290771L16.7753 1.35706ZM24.4306 9.21953H5.12807V20.2836H24.4306V9.21953ZM7.18098 12.1324C6.68518 12.1324 6.28325 12.5343 6.28325 13.0301C6.28325 13.5259 6.68518 13.9278 7.18098 13.9278H9.04635C9.54216 13.9278 9.94409 13.5259 9.94409 13.0301C9.94409 12.5343 9.54216 12.1324 9.04635 12.1324H7.18098ZM20.6901 12.1324C20.1943 12.1324 19.7924 12.5343 19.7924 13.0301C19.7924 13.5259 20.1943 13.9278 20.6901 13.9278H22.5555C23.0513 13.9278 23.4532 13.5259 23.4532 13.0301C23.4532 12.5343 23.0513 12.1324 22.5555 12.1324H20.6901ZM9.17669 17.6512H11.3239V19.253H9.17669V17.6512ZM14.3432 17.6513H12.196V19.253H14.3432V17.6513ZM15.2154 17.6513H17.3626V19.253H15.2154V17.6513ZM20.382 17.6513H18.2348V19.253H20.382V17.6513ZM10.9568 23.69H18.6019V25.7029C18.6019 26.2587 18.1513 26.7093 17.5954 26.7093H11.9632C11.4074 26.7093 10.9568 26.2587 10.9568 25.7029V23.69Z"
              fill="#9E9E9E"
            />
          </svg>
          <FormControl className={classes.formControl}>
            <Select
              labelId="select-label"
              id="select"
              value={this.props.robotSelected}
              onChange={this.handleRobotChange}
            >
              <MenuItem
                key={`robotList-Default`}
                value={this.state.robotDefault}
              >
                Default
              </MenuItem>
              {Object.keys(this.state.robotNameList).map(
                (robotId, robotIndex) => {
                  return (
                    <MenuItem key={`robotList-${robotIndex}`} value={robotId}>
                      {this.state.robotNameList[robotId].RobotName}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
          <svg
            width="14"
            height="18"
            viewBox="0 0 28 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.37263 9.78259V23.6176C6.37263 26.9313 9.05892 29.6176 12.3726 29.6176H17.42M6.37263 9.78259C6.37263 12.3705 6.37267 17.4353 17.42 17.4353M6.37263 9.78259H2.91919C2.3669 9.78259 1.91919 9.33487 1.91919 8.78259V3.54367V2.771C1.91919 2.21871 2.3669 1.771 2.91919 1.771H9.74531C10.2976 1.771 10.7453 2.21871 10.7453 2.771V7.33375V8.78259C10.7453 9.33487 10.2976 9.78259 9.74531 9.78259H6.37263ZM17.42 29.6176V32.7239C17.42 33.2762 17.8677 33.7239 18.42 33.7239H25.0807C25.633 33.7239 26.0807 33.2762 26.0807 32.7239V26.7226C26.0807 26.1703 25.633 25.7226 25.0807 25.7226H18.42C17.8677 25.7226 17.42 26.1703 17.42 26.7226L17.42 29.6176ZM17.42 17.4353L17.42 13.5623C17.42 13.01 17.8677 12.5623 18.42 12.5623H25.0286C25.5809 12.5623 26.0286 13.01 26.0286 13.5623V19.8096C26.0286 20.3618 25.5809 20.8096 25.0286 20.8096H18.42C17.8677 20.8096 17.42 20.3618 17.42 19.8096L17.42 17.4353Z"
              stroke="#CDCDCD"
              stroke-width="3"
            />
          </svg>
          <FormControl className={classes.formControl}>
            <Select
              labelId="select-label"
              id="select"
              value={this.props.flowSelected}
              onChange={evt => this.props.setFlowSelected(evt.target.value)}
            >
              {Object.keys(this.state.flowList).map((flowId, flowIndex) => {
                return (
                  <MenuItem key={`robotList-${flowIndex}`} value={flowId}>
                    {this.state.flowList[flowId].Label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Typography component="div" className={classes.whichFlowText}>
            {this.state.robotStatus.active_flow === "" ? (
              ""
            ) : (
              <Typography class="saving">
                <Link
                  component="button"
                  onClick={event => {
                    MasterComponent.onItemClick(
                      Flow.getComponentFactory({
                        id: this.state.robotStatus.active_flow,
                        name: this.state.robotStatus.active_flow
                      }),
                      this.state.robotStatus.active_flow + ".flo",
                      event.ctrlKey
                    );
                  }}
                >
                  {`Running ${this.state.robotStatus.active_flow}`}
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </Link>
              </Typography>
            )}
          </Typography>
          <div className={classes.grow} />
          {this.state.robotStatus.active_flow === this.props.flowSelected &&
          this.props.flowSelected !== "" ? (
            <IconButton
              className={classes.iconButton}
              size="small"
              onClick={() => this.handleClickAction("STOP")}
            >
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={
                !this.state.robotStatus.robotOnline ||
                this.props.flowSelected === ""
              }
              className={classes.iconButton}
              size="small"
              onClick={
                this.state.robotStatus.active_flow === ""
                  ? () => this.handleClickAction("START")
                  : () =>
                      MasterComponent.confirmAlert(
                        "Another Flow is running!",
                        `${
                          this.state.robotNameList[this.props.robotSelected]
                            .RobotName
                        } is running flow ${
                          this.state.robotStatus.active_flow
                        }. \n Are you sure you want to run the flow ${
                          this.props.flowID
                        }?`,
                        () => this.handleClickAction("START"), //change
                        () => {}, //do nothing close modal
                        "Run"
                      )
              }
            >
              <PlayArrowOutlinedIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

RobotFlowBar.propTypes = {
  flowID: PropTypes.string
};

RobotFlowBar.defaultProps = {};

export default withStyles(styles, { withTheme: true })(RobotFlowBar);
