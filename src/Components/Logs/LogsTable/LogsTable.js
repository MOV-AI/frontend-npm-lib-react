import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeMagic, useMagic } from "@tty-pt/styles";
import TableCell from "@mui/material/TableCell";
import { AutoSizer, Column, Table } from "react-virtualized";
import { COLUMN_LIST, COLOR_CODING } from "../utils/Constants";

makeMagic({
  logsTable: {
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box"
    },
    table: {
      // temporary right-to-left patch, waiting for
      // // https://github.com/bvaughn/react-virtualized/issues/454
      "& .ReactVirtualized__Table__headerRow": {
        flip: false,
        paddingRight: theme.direction === "rtl" ? "0 !important" : undefined
      }
    },
    tableRow: {
      cursor: "pointer"
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: "rgba(0, 5, 58, 0.3)"
      }
    },
    tableCell: {
      flexGrow: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "inline-block"
    },
    flexColumn: {
      flex: 1,
      alignItems: "center"
    },
    noClick: {
      cursor: "initial"
    },
  },
});

const MuiVirtualizedTable = props => {
  const {
    columns,
    rowHeight,
    noRowsRenderer,
    headerHeight,
    onRowClick,
    ...tableProps
  } = props;

  const magic = useMagic(theme => ({
    logsTable: {
      table: {
        // temporary right-to-left patch, waiting for
        // // https://github.com/bvaughn/react-virtualized/issues/454
        "& .ReactVirtualized__Table__headerRow": {
          flip: false,
          paddingRight: theme.direction === "rtl" ? "0 !important" : undefined
        }
      },
    }
  }));

  const isNumericColumn = columnIndex =>
    columnIndex !== null && columns[columnIndex]?.numeric;

  const getRowClassName = ({ index }) => {
    const { data } = props;
    const rowData = data[index];
    return clsx(
      "table-row",
      "flex-container",
      index !== -1 && magic[rowData.level],
      {
        "table-row-hover": index !== -1 && onRowClick != null
      }
    );
  };

  const cellRenderer =
    render =>
    ({ cellData, columnIndex }) => {
      return (
        <TableCell
          data-testid="section_table-cell"
          component="div"
          className="table-cell flex-container"
          variant="body"
          style={{ height: rowHeight }}
          align={isNumericColumn(columnIndex) || false ? "right" : "left"}
        >
          {render ? render(cellData) : cellData}
        </TableCell>
      );
    };

  const headerRenderer = ({ label, columnIndex }) => {
    return (
      <TableCell
        data-testid="section_header-cell"
        component="div"
        className="table-cell flex-container no-click"
        variant="head"
        style={{ height: headerHeight }}
        align={isNumericColumn(columnIndex) ? "right" : "left"}
      >
        <span data-testid="output_label">{label}</span>
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          data-testid="section_logs-table"
          height={height}
          width={width}
          noRowsRenderer={noRowsRenderer}
          onRowClick={onRowClick}
          rowHeight={rowHeight}
          gridStyle={{
            direction: "inherit"
          }}
          headerHeight={headerHeight}
          className="table"
          {...tableProps}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, render, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={headerProps => {
                  return headerRenderer({
                    ...headerProps,
                    columnIndex: index
                  });
                }}
                flexGrow={dataKey === "message" ? 1 : undefined}
                className="flex-container"
                cellRenderer={cellRenderer(render)}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
};

export default function LogsTable(props) {
  return (
    <MuiVirtualizedTable
      rowHeight={48}
      headerHeight={48}
      rowCount={props.logsData.length}
      rowGetter={({ index }) => props.logsData[index]}
      data={props.logsData}
      columns={props.columns.map(elem => COLUMN_LIST[elem])}
      onRowClick={props.onRowClick}
      noRowsRenderer={props.noRowsRenderer}
    />
  );
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
