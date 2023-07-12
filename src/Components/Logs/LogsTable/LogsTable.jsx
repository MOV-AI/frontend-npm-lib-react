import React, { useMemo } from "react";
import { makeMagic } from "@tty-pt/styles";
import PropTypes from "prop-types";

makeMagic({
  logs: {
    whiteSpace: "nowrap",
    tableLayout: "fixed",
    "& > tbody > tr > td": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "& > tbody > tr:first-child > td": {
      paddingTop: "8px",
    },
  },
  "!column-Time": {
    width: "180px",
  },
  "!column-Robot": {
    width: "100px",
  },
  "!column-Level": {
    width: "70px",
  },
  "!column-Module": {
    width: "100px",
  },
  "!column-Message": {
    flexGrow: 1,
    // width: "100%",
  },
  "?span.column-Robot": {
    // width: "calc(100px + 16px)",
  },
});


export default function LogsTable(props) {
  const { columns, logsData } = props;

  const fixedHeader = useMemo(() => columns.map(dataKey => (
    <div key={dataKey} className={"pad-bottom pad-top column-" + dataKey}>
      <span className={"border-bottom pad-bottom-small"}>
        { dataKey }
      </span>
    </div>
  )), [columns]);

  const header = useMemo(() => columns.map(dataKey => (
    <th key={dataKey} className={"pad-top column-" + dataKey}>
      <span className={"border-bottom pad-bottom-small"}>
        { dataKey }
      </span>
    </th>
  )), [columns]);


  const rows = useMemo(() => logsData.map((row, index) => (
    <tr key={index}>{ columns.map(dataKey => <td key={dataKey} className={"column-" + dataKey}>{ row[dataKey] }</td>) }</tr>
  )), [logsData, columns]);

  const noMatches = rows.length ? null : (<div className="margin-top-biggest size-horizontal text-align font-size-20">
    No matches found
  </div>);

  return (<>
    <div className="text-transform background-body horizontal-0 child-pad-horizontal text-align">
      { fixedHeader }
    </div>
    <div className="overflow flex-grow">
      <table className="logs table-vertical-small table-horizontal table-layout size-horizontal">
        <tbody>
          { rows }
        </tbody>
      </table>
      { noMatches }
    </div>
  </>);
}

LogsTable.propTypes = {
  columns: PropTypes.array,
  logsData: PropTypes.array,
  height: PropTypes.number,
  onRowClick: PropTypes.func
};

LogsTable.defaultProps = {
  columns: [],
  logsData: [],
  height: 10
};
