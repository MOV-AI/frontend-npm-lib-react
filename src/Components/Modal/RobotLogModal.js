import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ScheduleIcon from "@material-ui/icons/Schedule";
import WarningIcon from "@material-ui/icons/Warning";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ChatIcon from "@material-ui/icons/Chat";
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
      <Typography component="div">
        <List style={{ width: "100%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <i className="fas fa-robot"></i>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.robot} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ScheduleIcon />
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
                    <WarningIcon />
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
                    <ViewModuleIcon />
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
                <ChatIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={data.message}
              className={classes.breakWord}
            />
          </ListItem>
        </List>
        {data.action && (
          <div>
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
