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

/*
 * dependencies through props are preferable than through the decorator's
 * second argument. Perhaps defaultDependencies will be removed, as it is unused.
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
