import { useState, useEffect, useCallback } from "react";
import { Logs } from "@mov-ai/mov-fe-lib-core";

export function useLogs(myQuery, dependencies) {
  const logs = new Logs();

  const getFiltered = useCallback(
    ({ limit = 0, ...query }) =>
      logs.filter(query).slice(0, limit ? limit : undefined),
    [],
  );

  const [logsData, setLogsData] = useState(getFiltered(myQuery));

  useEffect(() => {
    setLogsData(getFiltered(myQuery));
    return logs.subscribe(() => setLogsData(getFiltered(myQuery)), myQuery);
  }, dependencies);

  return logsData;
}
