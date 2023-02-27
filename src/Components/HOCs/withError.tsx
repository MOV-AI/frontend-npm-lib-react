import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { Magic } from "@tty-pt/styles/lib/types";

interface WithErrorDependencies {
  "tty-pt/styles"?: {
    MagicContext?: React.Context<Magic>,
  },
  [key: string]: any,
}

interface WithErrorProps {
  children?: any,
  dependencies?: WithErrorDependencies,
  key?: string,
  [key: string]: any,
}

/*
 * dependencies through props are preferable than through the decorator's
 * second argument. This is needed more often. But sometimes it is also
 * useful passing them down through the second argument.
 */
export default
function withError(Component: React.ComponentType<WithErrorProps>, defaultDependencies?: WithErrorDependencies): React.FC<WithErrorProps> {
  function WithError(props: any): JSX.Element {
    const { key, children, dependencies = defaultDependencies, ...rest } = props;

    return (<ErrorBoundary key={key} dependencies={dependencies}>
      <Component { ...rest }>
        { children }
      </Component>
    </ErrorBoundary>);
  }

  return WithError;
}
