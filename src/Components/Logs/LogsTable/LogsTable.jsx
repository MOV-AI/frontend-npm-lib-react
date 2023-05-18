import React, { useMemo } from "react";
import PropTypes from "prop-types";

export default function LogsTable(props) {
  const { columns, logsData } = props;

  const header = useMemo(() => columns.map(dataKey => (
    <th key={dataKey} className="pad-top">
      <span className="border-bottom pad-bottom-small">
        { dataKey }
      </span>
    </th>
  )), [columns]);

  const rows = useMemo(() => logsData.map((row, index) => (
    <tr key={index}>{ columns.map(dataKey => <td>{ row[dataKey] }</td>) }</tr>
  )), [logsData, columns]);

  const noMatches = rows.length ? null : (<div className="margin-top-biggest size-horizontal text-align font-size-20">
    No matches found
  </div>);

  return (<>
    <table className="table-horizontal table-layout size-horizontal">
      <thead className="text-transform">
        <tr>{ header }</tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
    { noMatches }
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
