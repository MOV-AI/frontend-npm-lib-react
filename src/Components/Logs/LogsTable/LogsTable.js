import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { COLOR_CODING, COLUMNS_LABEL } from "../utils/Constants";
import i18n from "i18next";
import { TableVirtuoso } from "react-virtuoso";

const useStyles = makeStyles((theme) => {
  return {
    noRows: {
      fontSize: "20px",
      textAlign: "center",
      padding: "32px",
    },
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
    tableRow: {
      alignItems: "center",
      boxSizing: "border-box",
      cursor: "pointer",
    },
    table: {
      minWidth: "100%",
    },
    tableHead: {
      backgroundColor: theme.palette?.background.default,
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: "rgba(0, 5, 58, 0.3)",
      },
    },
    tableCell: {
      flexGrow: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "table-cell",
    },
    flexColumn: {
      flex: 1,
      alignItems: "center",
    },
    noClick: {
      cursor: "initial",
    },
    ...COLOR_CODING,
  };
});

const MuiVirtualizedTable = (props) => {
  const { columns, rowHeight, onRowClick, data, nonVirtual } = props;

  const columnKeys = useMemo(
    () => Object.keys(columns).filter((key) => columns[key]),
    [columns],
  );

  const classes = useStyles();

  const getRowClassName = useCallback(
    (item) =>
      clsx(classes.tableRow, classes[item.level], classes.tableRowHover),
    [classes],
  );

  const itemRender = useCallback(
    (_rowIndex, row) =>
      columnKeys.map((dataKey) => (
        <TableCell
          data-testid="section_table-cell"
          key={dataKey}
          className={`${classes.tableCell} ${classes.flexContainer}`}
          variant="body"
          style={{ height: rowHeight }}
        >
          {row[dataKey]}
        </TableCell>
      )),
    [columnKeys],
  );

  const CustomTable = useCallback(
    React.forwardRef((props, ref) => (
      <Table ref={ref} {...props} className={classes.table} />
    )),
    [classes],
  );

  const Row = useCallback(
    (props) => {
      const { item, children, ...rest } = props;

      return (
        <TableRow
          className={getRowClassName(item)}
          onClick={() => onRowClick({ rowData: item })}
          key={item.key}
          {...rest}
        >
          {children}
        </TableRow>
      );
    },
    [getRowClassName],
  );

  const headerRender = useCallback(
    (dataKey) => {
      const label = COLUMNS_LABEL[dataKey];
      return (
        <TableCell
          key={label}
          data-testid="section_header-cell"
          className={clsx(
            classes.tableCell,
            classes.flexContainer,
            classes.noClick,
          )}
          variant="head"
        >
          <span data-testid="output_label">{label}</span>
        </TableCell>
      );
    },
    [classes],
  );

  const fixedHeaderRender = useCallback(
    () => (
      <TableRow className={classes.tableHead}>
        {columnKeys.map(headerRender)}
      </TableRow>
    ),
    [classes, columnKeys],
  );

  if (!data.length)
    return (
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>{columnKeys.map(headerRender)}</TableRow>
        </TableHead>
        <TableBody>
          <TableRow data-testid="no-rows">
            <TableCell colSpan={columnKeys.length} className={classes.noRows}>
              {i18n.t("No matches found")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  else if (nonVirtual) {
    const rows = data.map((row, rowIndex) => (
      <Row key={row.key} item={row}>
        {itemRender(rowIndex, row)}
      </Row>
    ));

    return (
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>{columnKeys.map(headerRender)}</TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    );
  } else
    return (
      <TableVirtuoso
        itemContent={itemRender}
        fixedHeaderContent={fixedHeaderRender}
        components={{ TableRow: Row, Table: CustomTable }}
        data={data}
      />
    );
};

MuiVirtualizedTable.propTypes = {
  data: PropTypes.array,
  nonVirtual: PropTypes.bool,
  columns: PropTypes.object,
  onRowClick: PropTypes.func,
};

export default function LogsTable(props) {
  const { columns, logsData } = props;
  return (
    <MuiVirtualizedTable
      {...props}
      rowHeight={48}
      headerHeight={48}
      rowCount={logsData.length}
      rowGetter={({ index }) => logsData[index]}
      data={logsData}
      columns={columns}
    />
  );
}

LogsTable.propTypes = {
  columns: PropTypes.object,
  logsData: PropTypes.array,
  height: PropTypes.number,
  onRowClick: PropTypes.func,
  nonVirtual: PropTypes.bool,
};

LogsTable.defaultProps = {
  columns: {},
  logsData: [],
  height: 10,
};
