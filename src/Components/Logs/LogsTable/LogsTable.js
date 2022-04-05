import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { AutoSizer, Column, Table } from "react-virtualized";
import { colorCoding } from "../utils/Utils";

const useStyles = makeStyles(theme => {
  return {
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
    ...colorCoding
  };
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
  const classes = useStyles();

  const isNumericColumn = columnIndex =>
    columnIndex != null && columns[columnIndex]?.numeric;

  const getRowClassName = ({ index }) => {
    const { data } = props;
    const rowData = data[index];
    return clsx(
      classes.tableRow,
      classes.flexContainer,
      index !== -1 && classes[rowData.level],
      {
        [classes.tableRowHover]: index !== -1 && onRowClick != null
      }
    );
  };

  const cellRenderer =
    render =>
    ({ cellData, columnIndex }) => {
      return (
        <TableCell
          component="div"
          className={`${classes.tableCell} ${classes.flexContainer}`}
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
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={isNumericColumn(columnIndex) ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          height={height}
          width={width}
          noRowsRenderer={noRowsRenderer}
          onRowClick={onRowClick}
          rowHeight={rowHeight}
          gridStyle={{
            direction: "inherit"
          }}
          headerHeight={headerHeight}
          className={classes.table}
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
                className={classes.flexContainer}
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

// const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default function LogsTable(props) {
  return (
    <MuiVirtualizedTable
      rowHeight={48}
      headerHeight={48}
      rowCount={props.logsData.length}
      rowGetter={({ index }) => props.logsData[index]}
      data={props.logsData}
      columns={props.columns.map(elem => props.columnList[elem])}
      onRowClick={props.onRowClick}
      noRowsRenderer={props.noRowsRenderer}
    />
  );
}

LogsTable.propTypes = {
  columns: PropTypes.array,
  columnList: PropTypes.object,
  logsData: PropTypes.array,
  height: PropTypes.number,
  onRowClick: PropTypes.func
};

LogsTable.defaultProps = {
  columns: [],
  columnList: {},
  logsData: [],
  height: 10
};
