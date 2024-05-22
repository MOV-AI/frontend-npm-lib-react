import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode,
}

interface ErrorBoundaryState {
  error?: Error,
}

class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState> {
  constructor(props : any) {
    super(props);

    this.state = { };
  }

  componentDidCatch(error : Error) {
    console.error(error)
    this.setState({ error });
  }

  render() {
    const { children } = this.props;

    if (!this.state.error)
      return children;

    return (<div className="vertical pad colorPrimary">
      <h5>Something went wrong</h5>
      <pre>
        { this.state.error?.message }
      </pre>
    </div>);
  }
}

export default ErrorBoundary;
