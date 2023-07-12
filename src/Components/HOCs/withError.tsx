import React from "react";
import ErrorBoundary from "../ErrorBoundary";

/*
 * dependencies through props are preferable than through the decorator's
 * second argument. This is needed more often. But sometimes it is also
 * useful passing them down through the second argument.
 */
export default
function withError(Component: React.ComponentType): React.FC {
  function WithError(props: any) {
    const { key, children, ...rest } = props;

    return (<ErrorBoundary key={key}>
      <Component { ...rest }>
        { children }
      </Component>
    </ErrorBoundary>);
  }

  return WithError;
}
