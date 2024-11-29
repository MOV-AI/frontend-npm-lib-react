import { useState, useEffect, useCallback } from "react";
import { Logs } from "@mov-ai/mov-fe-lib-core";

export function useLogs(myQuery, dependencies) {
  const logs = new Logs();

  const getFiltered = useCallback(
    ({ limit = 0, ...query }) => logs.filter(query).slice(-limit),
    [],
  );

  const [logsData, setLogsData] = useState(getFiltered(myQuery));

  useEffect(
    () => logs.subscribe(() => setLogsData(getFiltered(myQuery))),
    [setLogsData, getFiltered, dependencies],
  );

  return logsData;
}
