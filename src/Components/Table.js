import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

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
