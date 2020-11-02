import React from "react";

import Logs from "../src/Components/Logs/Logs";

export default {
  title: "Logs Component"
};

export const logStory = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Logs
        robotStates={{
          error: "error",
          temp: "temp",
          okay: "okay",
          off: "off"
        }}
        levelsList={[
          { value: "INFO", label: "Robot Status" },
          // { value: "WARNING", label: "Warnings" },
          // { value: "DEBUG", label: "Debug" },
          { value: "ERROR", label: "Alerts" }
          // { value: "CRITICAL", label: "Critical" }
        ]}
      ></Logs>
    </div>
  );
};

logStory.story = {
  name: "Logs"
};
