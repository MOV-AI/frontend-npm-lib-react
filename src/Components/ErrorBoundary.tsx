import React, { Component, ReactNode } from "react";
import { withStyles } from "@mui/styles";
import { alpha } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import StackTrace, { StackFrame } from "stacktrace-js";

const styles = (theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    boxSizing: "border-box",
    backgroundColor: alpha(theme.palette.error.main, 0.2) + " !important",
    padding: "16px",
  },
});

function getStackLine(error: any, stackFrame: StackFrame) {
  const { functionName, fileName, lineNumber } = stackFrame;
  return (
    "Error: " +
    error.message +
    "\n    in " +
    functionName +
    " (at " +
    fileName +
    ":" +
    lineNumber +
    ")"
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  classes: object;
}

interface ErrorBoundaryState {
  error: Error | boolean;
  errorInfo: any;
  stackLine: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);

    this.state = { error: false, errorInfo: false, stackLine: "" };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // TODO use future error api
    //    const stackLine = getStackLine(error);
    this.setState({ error, errorInfo, stackLine: error.stack + "\n" });
    StackTrace.fromError(error).then((err) => {
      // const stackLine = err.map(getStackLine).join("\n");
      const stackLine = getStackLine(error, err[0]);
      this.setState({ error, errorInfo, stackLine });
    });
  }

  render() {
    const { children, classes } = this.props;

    if (!this.state.errorInfo) return children;

    return (
      <div className={classes.root}>
        <div>{"Error: " + this.state.error.message}</div>
      </div>
    );
  }
}

export default withStyles(styles)(ErrorBoundary);
