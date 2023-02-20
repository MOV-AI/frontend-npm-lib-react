import React, { Component, ReactNode } from "react";
import { withCast } from "@tty-pt/styles";
import { Cast } from "@tty-pt/styles/lib/types";
import StackTrace, { StackFrame } from "stacktrace-js";

function getStackLine(error : any, stackFrame : StackFrame) {
  const { functionName, fileName, lineNumber } = stackFrame;
  return "Error: " + error.message + "\n    in " + functionName + " (at " + fileName + ":" + lineNumber + ")";
}

interface ErrorBoundaryProps {
  c: Cast,
  children: ReactNode,
}

interface ErrorBoundaryState {
  error: Error|boolean,
  errorInfo: any,
  stackLine : string
}

class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState> {
  constructor(props : any) {
    super(props);

    this.state = { error: false, errorInfo: false, stackLine: "" };
  }

  componentDidCatch(error : Error, errorInfo : any) {
    // TODO use future error api
    //    const stackLine = getStackLine(error);
    this.setState({ error, errorInfo, stackLine: error.stack + "\n" });
    StackTrace.fromError(error).then(err => {
      // const stackLine = err.map(getStackLine).join("\n");
      const stackLine = getStackLine(error, err[0]);
      this.setState({ error, errorInfo, stackLine });
    });
  }

  render() {
    const { children, c } = this.props;

    if (!this.state.errorInfo)
      return children;

    return (<div className={c("vertical pad textPrimary")}>
      <div className={c("h5")}>Something went wrong</div>
      <pre className={c("margin0")}>
        { this.state.stackLine }
        { this.state.errorInfo.componentStack }
      </pre>
    </div>);
  }
}

export default withCast(ErrorBoundary);
