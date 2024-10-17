import React from "react";
import Table from "../src/Components/Table";
import AddBox from "@material-ui/icons/AddBox";
import { EMPTY_FUNCTION } from "../src/Utils/Constants";

export default {
  title: "Table",
};

export const simple = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Table></Table>
    </div>
  );
};

simple.story = {
  name: "Simple Table",
};

export const custom = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Table
        columns={[
          { title: "Adı", field: "name" },
          { title: "Soyadı", field: "surname" },
          { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          {
            name: "Vicente",
            surname: "Queiroz",
            birthYear: 1987,
            birthCity: 63,
          },
        ]}
      ></Table>
    </div>
  );
};

custom.story = {
  name: "Table w/data",
};

export const custom2 = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Table
        columns={[
          { title: "Adı", field: "name" },
          { title: "Soyadı", field: "surname" },
          { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
          {
            title: "Doğum Yeri",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        ]}
        actions={[
          {
            icon: () => <AddBox></AddBox>,
            tooltip: "Tooltip!",
            isFreeAction: true,
            onClick: EMPTY_FUNCTION,
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          draggable: false,
          grouping: false,
          search: true,
          toolbar: true,
          searchFieldAlignment: "left",
          paging: false,
        }}
      ></Table>
    </div>
  );
};

custom2.story = {
  name: "Custom Table",
};
