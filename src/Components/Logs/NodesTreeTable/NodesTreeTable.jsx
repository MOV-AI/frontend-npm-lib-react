import React, { Component } from "react";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Search from "@material-ui/icons/Search";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import MasterDB from "../../../api/MasterDB";
import Database from "../../../api/Database";
import lodashGet from "lodash.get";
import Paper from "@material-ui/core/Paper";
import { TreeDataState, CustomTreeData } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn
} from "@devexpress/dx-react-grid-material-ui";
import {
  findsUniqueKey,
  addNestedName,
  updateRunningNodes,
  removeDeleteContainer,
  detectContainerLoop
} from "../utils/Utils";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import isEqual from "lodash.isequal";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";
import StopIcon from "@material-ui/icons/Stop";
import { ActionsColumn } from "./ActionsColumn/ActionsColumn";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const tableIcons = {
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
};

// TODO: implement Key, Label to selectedFlow
class NodesTreeTable extends Component {
  state = {
    nodesLaunched: [],
    nodeTreeData: [
      // {
      //   id: 1,
      //   name: "test",
      //   nestedName: "test",
      //   template: "start_flow",
      //   status: "stopped",
      //   parentId: null
      // },
      // { id: 2, name: "cntner", flowId: "container", parentId: null },
      // {
      //   id: 3,
      //   name: "dddd",
      //   nestedName: "cntner__dddd",
      //   template: "simulator_reset",
      //   status: "stopped",
      //   parentId: 2
      // }
    ]
  };

  database = new Database();
  subscribersList = [];
  dataList = [];
  count = 0; // this is to know when the recursion ends
  addedNode = {}; //this is to wait for all info in sub

  drillDownSubscribers = (flow, index, nestedName, callback) => {
    this.count++;
    let id = index + 1;
    // Subscribe to flow, TODO: check if already there first
    this.subscribersList.push({
      type: "flow",
      index: index,
      scope: { Scope: "Flow", Name: flow }
    });
    MasterDB.subscribe(
      { Scope: "Flow", Name: flow },
      _updateFlowData => {
        if (_updateFlowData.event === "set") {
          // When you add a node
          const addedNode = lodashGet(
            _updateFlowData,
            `key.Flow.${flow}.NodeInst`,
            false
          );
          if (addedNode) {
            this.addedNode[
              Object.keys(Object.values(addedNode)[0])[0]
            ] = Object.values(Object.values(addedNode)[0])[0];
            // Wait for Template and NodeLabel info
            if (this.addedNode.NodeLabel && this.addedNode.Template) {
              this.dataList.push({
                id: findsUniqueKey(this.dataList, "id"),
                name: this.addedNode.NodeLabel,
                nestedName: addNestedName(nestedName, this.addedNode.NodeLabel),
                template: this.addedNode.Template,
                status: "stopped",
                parentId: flow === this.props.flowSelected ? null : index // flat hierarchy for first level
              });
              this.addedNode = {};
            }
          }
          // When you add a container
          const addedContainer = lodashGet(
            _updateFlowData,
            `key.Flow.${flow}.Container`,
            false
          );
          if (addedContainer) {
            if (Object.values(addedContainer)[0].ContainerFlow) {
              this.drillDownUnsubscribe();
              // reset dataList with new flow
              this.dataList = [];
              this.count = 0;
              this.drillDownSubscribers(
                this.props.flowSelected,
                0,
                "",
                callback
              );
            }
          }
        }

        if (_updateFlowData.event === "del") {
          const deletedKey = Object.keys(
            lodashGet(_updateFlowData, `key.Flow.${flow}`, {})
          )[0];
          const deletedName = Object.keys(
            Object.values(lodashGet(_updateFlowData, `key.Flow.${flow}`, {}))[0]
          )[0];
          // When you delete a node
          if (deletedKey === "NodeInst") {
            const newDataList = this.dataList.filter(
              elem => elem.name !== deletedName
            );
            this.dataList = newDataList;
          }
          // When you delete a container
          if (deletedKey === "Container") {
            // remove all the children of that container and TODO: unsubscribe
            const container = this.dataList.find(
              elem => elem.name === deletedName
            );
            // Remove if found match
            if (container) {
              removeDeleteContainer(this.dataList, container.id);
            }
          }
        }

        this.setState({ nodeTreeData: this.dataList });
        return 0;
      },
      _flowData => {
        const flowData = lodashGet(_flowData, `value.Flow.${flow}`, {});

        // If flow has Nodes
        if (flowData.NodeInst) {
          // Cycle through all the Nodes in that Flow
          Object.keys(flowData.NodeInst).forEach(node => {
            this.dataList.push({
              id: id,
              name: flowData.NodeInst[node].NodeLabel,
              nestedName: addNestedName(
                nestedName,
                flowData.NodeInst[node].NodeLabel
              ),
              template: flowData.NodeInst[node].Template,
              status: "stopped",
              parentId: index === 0 ? null : index
            });
            id = id + 1;
          });
        }

        // If flow has Containers
        if (flowData.Container) {
          // Cycle through all the Containers in that Flow
          Object.values(flowData.Container).forEach(container => {
            // Detect if there is a Container Loop
            if (
              !detectContainerLoop(
                this.dataList,
                index,
                container.ContainerFlow
              )
            ) {
              this.dataList.push({
                id: id,
                name: container.ContainerLabel,
                flowId: container.ContainerFlow,
                parentId: index === 0 ? null : index
              });
              const numberIds = this.drillDownSubscribers(
                container.ContainerFlow,
                id,
                container.ContainerLabel,
                callback
              );
              id = numberIds + 1;
            } else {
              // Remove all the nodes of the Loop Container Error
              this.dataList = this.dataList.filter(
                elem => elem.parentId !== index
              );
              this.dataList.push({
                id: id,
                name: `Loop Error`,
                flowId: container.ContainerFlow,
                parentId: index
              });
              id++;
            }
          });
        }

        this.count--;
        // Update state when finish recursion
        if (this.count === 0 && callback) {
          callback();
        }
      }
    );
    return id;
  };

  drillDownUnsubscribe = () => {
    this.subscribersList.forEach(sub => {
      MasterDB.unsubscribe(sub);
    });
    this.subscribersList = [];
  };

  componentDidUpdate(prevProps, prevState) {
    // This is the subscriber to know which nodes are running or not
    const robotSelected = this.props.robotSelected.Name;
    if (
      robotSelected !== "Default" &&
      robotSelected !== prevProps.robotSelected.Name
    ) {
      //TODO: unsubscribe from previous robot
      MasterDB.subscribe(
        {
          Scope: "Robot",
          Name: robotSelected,
          Status: "*"
        },
        updateData => {
          if (updateData.event === "hset") {
            // Update lodes launched and persistent nodes launched
            const updatedStatus = lodashGet(
              updateData,
              `key.Robot.${robotSelected}.Status`,
              false
            );
            const newNodesLaunched = updatedStatus.nodes_lchd.concat(
              updatedStatus.persistent_nodes_lchd
            );
            if (!isEqual(newNodesLaunched, this.state.nodesLaunched)) {
              // Update running nodes in tree
              const newDataList = updateRunningNodes(
                this.dataList,
                newNodesLaunched
              );
              this.dataList = newDataList;
              this.setState({
                nodesLaunched: newNodesLaunched,
                nodeTreeData: newDataList
              });
            }
          }
        },
        data => {
          const robotStatus = lodashGet(
            data,
            `value.Robot[${this.props.robotSelected.Name}].Status`,
            { nodes_lchd: [], persistent_nodes_lchd: [] }
          );
          const nodesLaunched = robotStatus.nodes_lchd.concat(
            robotStatus.persistent_nodes_lchd
          );
          this.setState({ nodesLaunched });
        }
      );
    }
    if (
      this.props.flowSelected !== "" &&
      this.props.flowSelected !== prevProps.flowSelected
    ) {
      // Unsubscribe first
      this.drillDownUnsubscribe();
      // reset dataList with new flow
      this.dataList = [];
      // Subscribe loop
      this.drillDownSubscribers(this.props.flowSelected, 0, "", () => {
        this.count = 0;
        this.setState({
          nodeTreeData: this.dataList
        });
      });
    }
  }

  componentWillUnmount() {
    this.drillDownUnsubscribe();
  }

  // This renders the tree data in array form with ids and parentIds
  getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(
      r => r.parentId === (row ? row.id : null)
    );
    return childRows.length ? childRows : null;
  };

  render() {
    const actions = [
      {
        icon: <PlayArrowOutlinedIcon />,
        action: row =>
          this.database.cloudFunction(
            "backend.FlowTopBar",
            "commandNode", // function
            {
              command: "RUN",
              nodeName: row.nestedName,
              robotName: this.props.robotSelected.Name
            }, // args
            res => {}
          )
      },
      {
        icon: <StopOutlinedIcon />,
        action: row =>
          this.database.cloudFunction(
            "backend.FlowTopBar",
            "commandNode", // function
            {
              command: "KILL",
              nodeName: row.nestedName,
              robotName: this.props.robotSelected.Name
            }, // args
            res => {}
          )
      }
    ];
    return (
      <div>
        {/* <MaterialTable
          title=""
          icons={tableIcons}
          // data={JSON.parse(JSON.stringify(this.state.nodeTreeData))}
          data={this.dataList.map(item => Object.assign({}, item))}
          //data={this.state.array}
          columns={[
            {
              title: "Label",
              field: "label",
            },
            { title: "Template", field: "template" },
            { title: "Status", field: "status" }
          ]}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: false,
            sorting: false,
            draggable: false,
            grouping: false,
            paging: false,
            actionsColumnIndex: -1,
            searchFieldAlignment: "left"
          }}
        /> */}
        {/* <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={20}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesSpots />
        </Sparklines> */}
        <Paper>
          <Grid
            rows={JSON.parse(JSON.stringify(this.state.nodeTreeData))}
            columns={[
              {
                title: "Name",
                name: "name"
              },
              { title: "Template", name: "template" },
              { title: "Status", name: "status" }
            ]}
          >
            <TreeDataState />
            <CustomTreeData getChildRows={this.getChildRows} />
            <Table columnExtensions={[{ columnName: "label", width: 300 }]} />
            <TableHeaderRow
              cellComponent={cell => {
                return cell.column.title === "Status" ? (
                  <Table.Cell>
                    <Button style={{ textTransform: "none" }}>Status</Button>
                  </Table.Cell>
                ) : (
                  <Table.Cell>{cell.column.title}</Table.Cell>
                );
              }}
            />
            <ActionsColumn actions={actions} />
            <TableTreeColumn for="name" />
          </Grid>
        </Paper>
      </div>
    );
  }
}

NodesTreeTable.propTypes = {
  flowSelected: PropTypes.string,
  robotSelected: PropTypes.object
};

NodesTreeTable.defaultProps = {
  flowSelected: "",
  robotSelected: { Name: "183ff446809d461baa676427cec1303e", IP: "127.0.0.1" }
};

export default NodesTreeTable;

// Example Data
// [
//   {
//     id: 1,
//     label: "flow2"
//   },
//   {
//     id: 2,
//     label: "amcl",
//     template: "ROS1/Publisher",
//     status: "Running",
//     parentId: 1
//   },
//   {
//     id: 3,
//     label: "container3",
//     parentId: 1
//   },
//   {
//     id: 4,
//     label: "front_camera",
//     template: "MovAI/TransitionOut",
//     status: "Running",
//     parentId: 3
//   },
//   {
//     id: 5,
//     label: "central_controller"
//   },
//   {
//     id: 6,
//     label: "rteb",
//     template: "ROS1/Service",
//     status: "Stop",
//     parentId: 5
//   }
// ]
