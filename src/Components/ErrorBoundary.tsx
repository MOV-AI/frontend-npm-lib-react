import React, { Component, ReactNode } from "react";
import StackTrace, { StackFrame } from "stacktrace-js";

function getStackLine(error : any, stackFrame : StackFrame) {
  const { functionName, fileName, lineNumber } = stackFrame;
  return "Error: " + error.message + "\n    in " + functionName + " (at " + fileName + ":" + lineNumber + ")";
}

interface ErrorBoundaryProps {
  children: ReactNode,
}

interface ErrorBoundaryState {
  error: Error|boolean,
  errorInfo: any,
  stackLine : string
}

export default
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
    const { children } = this.props;

    if (!this.state.errorInfo)
      return children;

    return (<div className="vertical pad color-primary">
      <div className="h-5">Something went wrong</div>
      <pre className="margin-0">
        { this.state.stackLine }
        { this.state.errorInfo.componentStack }
      </pre>
    </div>);
  }
}
