import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { Magic } from "@tty-pt/styles/lib/types";

interface WithErrorProps {
  children?: any,
  [key: string]: any,
}

interface WithErrorDependencies {
  MagicContext?: React.Context<Magic>,
}

export default
function withError(Component: React.ComponentType<WithErrorProps>, dependencies?: WithErrorDependencies): React.FC<WithErrorProps> {
  function WithError(props: any): JSX.Element {
    const { children, ...rest } = props;

    return (<ErrorBoundary dependencies={dependencies}>
      <Component { ...rest }>
        { children }
      </Component>
    </ErrorBoundary>);
  }

  return WithError;
}
