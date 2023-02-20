import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { Magic } from "@tty-pt/styles/lib/types";

interface WithErrorDependencies {
  MagicContext?: React.Context<Magic>,
}

interface WithErrorProps {
  children?: any,
  dependencies?: WithErrorDependencies,
  key?: string,
  [key: string]: any,
}

export default
function withError(Component: React.ComponentType<WithErrorProps>): React.FC<WithErrorProps> {
  function WithError(props: any): JSX.Element {
    const { key, children, dependencies, ...rest } = props;

    return (<ErrorBoundary key={key} dependencies={dependencies}>
      <Component { ...rest }>
        { children }
      </Component>
    </ErrorBoundary>);
  }

  return WithError;
}
