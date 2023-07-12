import React from "react";
import withMock from "storybook-addon-mock";
import { RobotManager } from "@mov-ai/mov-fe-lib-core";

import { authParams } from "./_mockLogin";
import Logs from "../src/Components/Logs/Logs";
import withAuthentication from "../src/Components/HOCs/withAuthentication";

export default {
  title: "Logs Component",
  decorators: [withMock]
};

const LogsTable = () => {
  const robotManager = React.useMemo(() => new RobotManager(), []);
  const [robots, setRobots] = React.useState({});

  React.useEffect(() => {
    robotManager.getAll(data => setRobots(data));
  }, []);

  const formatRobotData = () => {
    const res = [];
    Object.keys(robots).forEach(elem => {
      const id = elem;
      res.push({
        id,
        name: robots?.[id].RobotName,
        ip: robots?.[id].IP
      });
    });
    return res;
  };

  return (
    <div style={{ height: "90vh" }}>
      <div className="dark">
        <Logs robotsData={formatRobotData()}></Logs>
      </div>
    </div>
  );
};

const Template = () => {
  const AuthLogs = withAuthentication(LogsTable);
  return <AuthLogs />;
};

export const logStory = Template.bind({});

logStory.parameters = authParams;

logStory.story = {
  name: "Logs"
};
