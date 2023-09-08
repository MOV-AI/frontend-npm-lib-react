import React from "react";
import ErrorBoundary from "../src/Components/ErrorBoundary";

export default {
  title: "Error Boundary"
};

function Throw() {
  useEffect(() => {
    throw new Error("Hello world");
  }, []);

  return <></>;
}

export const errorBoundary = () => (
  <div style={{ height: "90vh" }}>
    <ErrorBoundary>
      <Throw />
    </ErrorBoundary>
  </div>
);

errorBoundary.story = {
  name: "simple error boundary"
};
