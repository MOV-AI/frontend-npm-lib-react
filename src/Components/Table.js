import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// More information in: https://material-table.com/#/docs/all-props

const Table = props => {
  return (
    <MaterialTable
      data-testid="section_material-table"
      {...props}
      style={props.style}
      title={props.title}
      columns={props.columns}
      data={props.data}
      actions={props.actions}
      options={props.options}
      components={props.components}
      localization={props.localization}
      icons={{
        ...tableIcons,
        ...props.icons
      }}
    />
  );
};

Table.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  actions: PropTypes.array,
  options: PropTypes.object,
  components: PropTypes.object,
  localization: PropTypes.object,
  icons: PropTypes.object
};
Table.defaultProps = {
  style: {},
  title: "",
  columns: [],
  data: [],
  actions: [],
  icons: {},
  options: {
    actionsColumnIndex: -1,
    draggable: false,
    grouping: false,
    search: false,
    toolbar: false,
    searchFieldAlignment: "left",
    paging: false
  },
  components: {}
};

export default Table;
