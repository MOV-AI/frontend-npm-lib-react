import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningIcon from "@mui/icons-material/Warning";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ChatIcon from "@mui/icons-material/Chat";
import { MasterDB } from "@mov-ai/mov-fe-lib-core";
import AbstractModal from "./AbstractModal";

const styles = theme => ({
  breakWord: {
    wordBreak: "break-all"
  }
});

class RobotLogModal extends Component {
  state = {
    data: {},
    open: false,
    hasButton: false
  };

  open = alert => {
    const { data } = this.state;
    // Format time
    const time = new Date(alert.time * 1000);
    const alertButton = alert.button
      ? JSON.parse(alert.button.replace(/'/g, '"'))
      : null;
    data.time = `${time.toLocaleTimeString("pt")}`;
    data.action = alert.action;
    data.message = alert.message;
    data.robot = alert.robot;
    data.service = alert.service;
    data.module = alert.module;
    if (alertButton) {
      data.buttonText = alertButton.label;
      data.buttonAction = this.getRobotAlertAction(alertButton);
    }
    // Update state variables
    this.setState({
      data,
      open: true,
      hasButton: !!alertButton
    });
  };

  getRobotAlertAction = ({ callback, data }) => {
    // Trigger callback to clear log
    if (callback) {
      return () => {
        MasterDB.cloudFunction(callback, "", data, res => {
          this.setState({ open: false });
        });
      };
    }
    // Default case (just close modal)
    else {
      return () => this.setState({ open: false });
    }
  };

  renderAlertInfo = () => {
    const { data } = this.state;
    const { props, classes } = this.props;
    return (
      <Typography data-testid="section_robot-log-modal" component="div">
        <List style={{ width: "100%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <i data-testid="output_robot-icon" className="fas fa-robot"></i>
              </Avatar>
            </ListItemAvatar>
            <ListItemText data-testid="output_text" primary={data.robot} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ScheduleIcon data-testid="output_icon" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.time} />
          </ListItem>
          <Divider variant="inset" component="li" />
          {props.includes("service") && (
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WarningIcon data-testid="output_warning-icon" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={data.service}
                  className={classes.breakWord}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )}
          {props.includes("module") && (
            <div>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ViewModuleIcon data-testid="output_module-icon" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={data.module}
                  className={classes.breakWord}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )}
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ChatIcon data-testid="output_chat-icon" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={data.message}
              className={classes.breakWord}
            />
          </ListItem>
        </List>
        {data.action && (
          <div data-testid="output_action">
            <Divider />
            <List style={{ width: "100%" }}>
              <ListItem>
                <ListItemText
                  primary={data.action}
                  className={classes.breakWord}
                />
              </ListItem>
            </List>
          </div>
        )}
      </Typography>
    );
  };

  render() {
    const { data, open, hasButton } = this.state;
    const { title } = this.props;
    return (
      <AbstractModal
        open={open}
        title={title}
        style={{ maxWidth: 500 }}
        onCancel={() => this.setState({ open: false })}
        onSubmit={data.buttonAction}
        submitText={data.buttonText}
        submitColor={"primary"}
        hasSubmitButton={hasButton}
        hasCancelButton={false}
      >
        {this.renderAlertInfo()}
      </AbstractModal>
    );
  }
}

RobotLogModal.propTypes = {
  title: PropTypes.string,
  props: PropTypes.array
};

RobotLogModal.defaultProps = {
  title: "Log Details",
  props: []
};

export default withStyles(styles, { withTheme: true })(RobotLogModal);
