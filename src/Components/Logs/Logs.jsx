import React, { useMemo, useCallback, useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { RobotManager } from "@mov-ai/mov-fe-lib-core";
import RobotLogModal from "../Modal/RobotLogModal";
import LogsFilterBar from "./LogsFilterBar/LogsFilterBar";
import LogsTable from "./LogsTable/LogsTable";
import LogsSkeleton from "./LogsSkeleton";
import {
  DATE_KEY_OPTION,
  ADVANCED_LEVELS_LIST,
  COLUMN_LIST,
  DEFAULT_LIMIT,
  DEFAULT_SELECTED_COLUMNS,
  DEFAULT_SELECTED_LEVELS,
  DEFAULT_SELECTED_SERVICES,
  ROBOT_LOG_TYPE,
} from "./utils/Constants";
import { findsUniqueKey, getDateTime } from "./utils/Utils";
import _uniqWith from "lodash/uniqWith";
import _isEqual from "lodash/isEqual";
import { Sub } from "@tty-pt/sub";
import "./styles";
import "./Logs.css";

// TODO this should be exported. Fleetboard uses it
function blobDownload(file, fileName, charset = "text/plain;charset=utf-8") {
  const blob = new Blob([file], { type: charset });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

const logsSub = new Sub([]);

const logsCat = logsSub.makeEmit(newLogs => [...logsSub.current(), ...newLogs]);
const logsPush = logsSub.makeEmit(log => [log, ...logsSub.current()]);

async function fetchLogs(filters) {
  const response = await RobotManager.getLogs(filters);
  return logsCat((response?.data ?? []).map(log => ({ ...log, time: log.time * 1000 })));
}

/**
 * CONSTANTS
 */
// const NO_ROBOTS_RETRY_TIMEOUT = 1000;
const Logs = props => {
  // Props
  const { robotsData } = props;
  // Refs
  const logModalRef = useRef();
  // State hooks
  const [columns, setColumns] = useState(DEFAULT_SELECTED_COLUMNS);
  const [filters, setFilters] = useState({
    limit: DEFAULT_LIMIT,
    level: {
      selected: DEFAULT_SELECTED_LEVELS,
      list: ADVANCED_LEVELS_LIST,
    },
    service: { selected: DEFAULT_SELECTED_SERVICES },
    tag: { selected: [] },
    searchMessage: "",
    robots: { selected: [] },
    date: { from: "", to: "" },
  });
  const logsData = logsSub.use();

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Prevent all subsequent requests from being dispatched
   */
  const baseParams = useMemo(() => ({
    level: { selected: filters.level.selected, list: filters.level.list },
    service: { selected: filters.service.selected },
    tag: { selected: filters.tag.selected },
    searchMessage: filters.searchMessage,
    robots: { selected: filters.robots.selected },
    limit: filters.limit
  }), [filters.level.selected, filters.level.list, filters.service.selected, filters.tag.selected, filters.searchMessage, filters.limit, filters.robots.selected]);

  useEffect(() => { fetchLogs(filters) }, [filters]);

  useEffect(() => { RobotManager.openLogs(baseParams).then(sock => {
    sock.onmessage = (msg) => {
      const item = JSON.parse(msg?.data ?? {});
      logsPush({ ...item, time: item.time / 1000 });
    };
  }) }, [baseParams]);

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  // On change robots data
  useEffect(() => {
    // New robots added, will be added to the selector list
    setFilters({
      ...filters,
      robots: {
        selected: robotsData.filter(r => r.isSelected ?? true).map(r => r.name),
      },
    });
  }, [robotsData]);

  //========================================================================================
  /*                                                                                      *
   *                               On filter change actions                               *
   *                                                                                      */
  //========================================================================================

  /**
   * On change selected robot from filter, refresh logs in table
   * @param {string} robotId : Robot ID to toggle select state
   */
  const onChangeRobotSelection = useCallback(
    robotId => {
      setFilters(filters => {
        if (!robotsData[robotId])
          return filters;

        const name = robotsData[robotId].name;

        return {
          ...filters,
          robots: {
            selected: filters.robots.selected.concat([name]),
          },
        };
      });
    },
    [filters]
  );

  /**
   * On change message from filter
   * @param {string} text : Search text
   */
  const onChangeMessage = useCallback(text => {
    setFilters({
      ...filters,
      searchMessage: text,
    });
  }, [filters]);

  /**
   * On change levels from filter
   */
  const onChangeLevels = useCallback(event => {
    setFilters({
      ...filters,
      level: {
        ...filters.level,
        selected: event.target.value,

      },
    });
  }, [filters]);

  /**
   * On change selected services from filter
   */
  const onChangeServices = useCallback(event => {
    setFilters({
      ...filters,
      service: {
        selected: event.target.value,
      },
    });
  }, [filters]);

  /**
   * On change limit from filter
   */
  const onChangeLimit = useCallback(event => {
    let _limit = DEFAULT_LIMIT;
    if (event.target.value !== "") _limit = event.target.value;
    setFilters({ ...filters, limit: _limit });
  }, []);

  /**
   * On change columns from filter
   */
  const onChangeColumns = useCallback(event => {
    // make sure columns are always with the same order
    const newColumns = Object.keys(COLUMN_LIST).filter(col =>
      event.target.value.includes(col)
    );
    setColumns(newColumns);
  }, []);

  /**
   * On change dates from filter
   */
  const onChangeDate = useCallback((newDate, keyToChange) => {
    const setDate = {
      [DATE_KEY_OPTION.FROM]: date => {
        setFilters({
          ...filters,
          date: {
            from: date,
            to: filters.date.to,
          },
        });
      },
      [DATE_KEY_OPTION.TO]: date => {
        setFilters({
          ...filters,
          date: {
            from: filters.date.from,
            to: date,
          },
        });
      },
    };
    setDate[keyToChange](newDate);
  }, [filters]);

  /**
   * On add tag from filter
   */
  const addTag = useCallback(tagText => {
    // Don't add tag if it's empty or duplicate

    if (tagText === "" || filters.tag.selected.find(elem => elem.label === tagText))
      return;

    setFilters({
      ...filters,
      tag: {
        selected: [
          ...filters.tag.selected,
          {
            key: findsUniqueKey(filters.tag.selected, "key"),
            label: tagText
          }
        ],
      }
    });
  }, [filters]);

  /**
   * On delete tag from filter
   */
  const deleteTag = useCallback(tagToDelete => {
    setFilters({
      ...filters,
      tag: {
        selected: filters.tag.selected.filter(tag => tag.key !== tagToDelete.key),
      },
    });
  }, [filters]);

  const getLogsToExport = useCallback(() => {
    return RobotManager.getLogs(filters)
      .then(response => {
        return response?.data || [];
      })
  }, [filters])

  /**
   * On export logs
   */
  const handleExport = useCallback(() => {
    const sep = "\t";
    getLogsToExport().then(logs => {
      const contents = logs.map(log => {
        const [date, time] = getDateTime(log.time);
        return [date, time, log.robot, log.message].join(sep);
      });
      // from https://www.epochconverter.com/programming/
      const dateString = !logs.length ? new Date().toISOString() : new Date(logs[0].time).toISOString();
      blobDownload([columns.join(sep), ...contents].join("\n"), `movai-logs-${dateString}.csv`, "text/csv;charset=utf-8");
    })
  }, [columns, getLogsToExport]);

  //========================================================================================
  /*                                                                                      *
   *                                Handlers for Logs Table                               *
   *                                                                                      */
  //========================================================================================

  /**
   * Open log details
   */
  const openLogDetails = useCallback(log => {
    logModalRef.current.open(log.rowData);
  }, []);

  /**
   * Render Logs skeleton
   */
  const handleNoRows = useCallback(() => {
    return (
      <Typography data-testid="output_no-rows" variant="h2">
        <LogsSkeleton></LogsSkeleton>
      </Typography>
    );
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                 Format Data to Render                                *
   *                                                                                      */
  //========================================================================================

  const filteredData = useMemo(() => logsData.filter(item => {
    if ( (filters.searchMessage && !item.message.includes(filters.searchMessage))
      || (filters.date.to && (new Date(item.time) > new Date(filters.date.to)))
      || (filters.level.selected.length && !filters.level.selected.includes(item.level))
      || (filters.tag.selected.length && !filters.tag.selected.includes(item.tag))
      || (filters.service.selected.length && !filters.service.selected.includes(item.service.toUpperCase()))
      || (filters.robots.selected.length && !filters.robots.selected.includes(item.robot))
      || (filters.date.from && (new Date(item.time) < new Date(filters.date.from)))
    )
      return false;
    return true;
  }), [filters, logsData]);

  return (<>
    <div className="vertical-0 size-vertical">
      <LogsFilterBar
        selectedRobots={robotsData.map(robot => robot.name)}
        updateRobotSelection={onChangeRobotSelection}
        handleLevels={onChangeLevels}
        handleSelectedService={onChangeServices}
        handleLimit={onChangeLimit}
        handleColumns={onChangeColumns}
        handleMessageRegex={onChangeMessage}
        handleDateChange={onChangeDate}
        handleAddTag={addTag}
        handleDeleteTag={deleteTag}
        handleExport={handleExport}
        levels={filters.level.selected}
        levelsList={filters.level.list}
        selectedService={filters.service.selected}
        limit={filters.limit}
        columns={columns}
        columnList={COLUMN_LIST}
        tags={filters.tag.selected}
        messageRegex={filters.searchMessage}
        selectedFromDate={filters.date.from}
        selectedToDate={filters.date.to}
        logsData={logsData}
      ></LogsFilterBar>
      <LogsTable
        columns={columns}
        columnList={COLUMN_LIST}
        logsData={filteredData}
        levelsList={filters.level.list}
        onRowClick={openLogDetails}
        noRowsRenderer={handleNoRows}
      ></LogsTable>
    </div>
    <RobotLogModal ref={logModalRef} props={ROBOT_LOG_TYPE}></RobotLogModal>
  </>);
};

export default Logs;
