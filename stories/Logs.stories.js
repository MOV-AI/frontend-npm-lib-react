import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RobotManager } from "@mov-ai/mov-fe-lib-core";
import Logs from "../src/Components/Logs/Logs";
import withAuthentication from "../src/Components/HOCs/withAuthentication";

export default {
  title: "Logs Component",
};

const LogsTable = () => {
  const robotManager = useMemo(() => new RobotManager(), []);
  const [robots, setRobots] = useState({});

  useEffect(() => {
    robotManager.getAll(data => setRobots(data));
  }, [robotManager]);

  const formatRobotData = useCallback(() => {
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
  }, [robots]);

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

logStory.story = {
  name: "Logs"
};
