import React, { useEffect, useRef } from "react";
import MaterialTable from "@material-table/core";

export default function CustomMaterialTable(props) {
  const tableRef = useRef();
  const openedPanels = useRef({});
  const oldFunction = useRef();

  useEffect(() => {
    if (!oldFunction.current) {
      oldFunction.current = tableRef.current?.onToggleDetailPanel;
    }

    if (oldFunction.current === tableRef.current?.onToggleDetailPanel) {
      tableRef.current.onToggleDetailPanel = (path, render) => {
        if (tableRef.current.props.data[path[0]]?.tableData?.showDetailPanel) {
          delete openedPanels.current[path[0]];
        } else {
          openedPanels.current = {
            ...openedPanels.current,
            [path[0]]: true,
          };
        }

        oldFunction.current(path, render);
      };
    }
  }, [tableRef]);

  return (
    <MaterialTable
      tableRef={tableRef}
      {...props}
      data={
        props.data?.map((d, i) => {
          const detailPanelFunction =
            typeof props.detailPanel === "function"
              ? props.detailPanel
              : (rowData) => props.detailPanel[0](rowData).render();
          return {
            ...d,
            tableData: {
              showDetailPanel: openedPanels.current[i]
                ? detailPanelFunction
                : null,
            },
          };
        }) || []
      }
    />
  );
}
