import React from "react";
import ErrorBoundary from "../ErrorBoundary";

interface WithErrorProps {
  children?: any;
  key?: string;
  [key: string]: any;
}

export default function withError(
  Component: React.ComponentType<WithErrorProps>,
): React.FC<WithErrorProps> {
  function WithError(props: any): JSX.Element {
    const { key, children, ...rest } = props;

    return (
      <ErrorBoundary key={key}>
        <Component {...rest}>{children}</Component>
      </ErrorBoundary>
    );
  }

  return WithError;
}
