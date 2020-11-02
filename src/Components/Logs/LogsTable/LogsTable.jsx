import React, { memo } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { fixedColumns, colorCoding } from "../utils/Utils";
import { isEqual } from "lodash";
import ReactVirtualizedTable from "./VirtualizedTable/VirtualizedTable";

const LogsTable = props => {
  console.log(
    "vicente props.columns.map(elem => props.columnList[elem])",
    props.columns.map(elem => props.columnList[elem])
  );
  return (
    <ReactVirtualizedTable
      data={props.logsData}
      columns={props.columns.map(elem => props.columnList[elem])}
    ></ReactVirtualizedTable>
    // <MaterialTable
    //   title="Simple Action Preview"
    //   columns={props.columns.map(elem => fixedColumns[elem])}
    //   data={props.logsData}
    //   options={{
    //     actionsColumnIndex: -1,
    //     draggable: false,
    //     grouping: false,
    //     search: false,
    //     toolbar: false,
    //     padding: "dense",
    //     sorting: false,
    //     // searchFieldAlignment: "left",
    //     paging: false,
    //     headerStyle: { position: "sticky", top: 0 },
    //     // maxBodyHeight: `${props.height}px`, //TODO: Need to calculate height to put sticky header
    //     rowStyle: rowData => {
    //       return {
    //         backgroundColor: colorCoding[rowData.level].backgroundColor
    //         // color: colorCoding[rowData.level].color
    //       };
    //     }
    //   }}
    // />
  );
};

LogsTable.propTypes = {
  columns: PropTypes.array,
  columnList: PropTypes.object,
  height: PropTypes.number
};

LogsTable.defaultProps = {
  columns: [],
  columnList: {},
  height: 10
};

//The function returns true when the compared props equal, preventing the component from re-rendering
function arePropsEqual(prevProps, nextProps) {
  return false;
  // return isEqual(prevProps.logsData, nextProps.logsData);
}

export default memo(LogsTable, arePropsEqual);
