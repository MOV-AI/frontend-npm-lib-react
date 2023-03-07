import React, { useCallback, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import _set from "lodash/set";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";
import { Grid, Typography } from "@material-ui/core";
import { Workspace, CONSTANTS } from "@mov-ai/mov-fe-lib-core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import i18n from "../../i18n/i18n.js";
import BasicVirtualizedTree from "../Tree/BasicVirtualizedTree";
import AbstractModal from "./AbstractModal";

const initialData = [
  {
    id: 0,
    name: i18n.t("Annotations"),
    scope: "Annotation",
    children: []
  },
  {
    id: 1,
    name: i18n.t("Callback"),
    scope: "Callback",
    children: []
  },
  {
    id: 2,
    name: i18n.t("Configuration"),
    scope: "Configuration",
    children: []
  },
  {
    id: 3,
    name: i18n.t("Flow"),
    scope: "Flow",
    children: []
  },
  {
    id: 4,
    name: i18n.t("Nodes"),
    scope: "Node",
    children: []
  },
  {
    id: 5,
    name: i18n.t("Layouts"),
    scope: "Layout",
    children: []
  },
  {
    id: 6,
    name: i18n.t("Scenes"),
    scope: "GraphicScene",
    children: []
  }
];

function scopeFilter(scopeList, data) {
  return data.filter(elem => scopeList.includes(elem.scope));
}

export
async function getAllData(workspace, data = initialData) {
  const elements = await Promise.all(data.map(element =>
    Workspace.getDocs({ workspace, scope: element.scope }).then(response => response.scopes
      .sort((a, b) => a.ref.localeCompare(b.ref))
      .map((elem, i) => {
        return {
          id: i,
          url: elem.url,
          name: elem.ref,
          children: [{ name: "" }]
        };
      })
    )
  ));

  return elements.map((element, index) => ({
    ...data[index],
    children: element,
  }));
}

const SelectScopeModal = props => {
  const [data, setData] = useState(props.data ?? initialData);
  const [selectedScopeItem, setSelectedScopeItem] = useState(props.selected);
  const [isLoading, setIsLoading] = React.useState(true);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  const scopeFilteredData = useMemo(
    () => scopeFilter(props.scopeList, data),
    [data, props.scopeList]
  );

  useEffect(() => setData(filterData(props.data ?? initialData)), [props.data]);

  /**
   * Filter data based filter props
   * @param {Object} _data : Raw data
   * @returns {Object} Filtered data
   */
  const filterData = _data => {
    const filteredData = _cloneDeep(scopeFilter(props.scopeList, _data));
    if (!props.filter) return filteredData;
    // Filter data
    _data.forEach((scope, index) => {
      filteredData[index].children = scope.children.filter(props.filter);
    });
    return filteredData;
  };

  const requestScopeVersions = useCallback(
    node => {
      const dataToSet = _cloneDeep(scopeFilteredData);

      const mapObj = {
        0: () => {
          const indexToSet = dataToSet.findIndex(elem => elem.id === node.id);

          // Toggle the expansion of the panel
          const isExpanded = _get(
            dataToSet,
            [indexToSet, "state", "expanded"],
            false
          );
          _set(dataToSet, [indexToSet, "state"], {
            expanded: !isExpanded
          });

          setData(dataToSet);
        },
        1: () => {
          // second level, ask for versions (versions of scope items)

          // find index of selected node in first level
          const indexToSet = dataToSet.findIndex(
            elem => elem.id === node.parents[0]
          );

          Workspace.getDocs({
            workspace: CONSTANTS.GLOBAL_WORKSPACE,
            scope: dataToSet[indexToSet].scope,
            id: node.name
          })
            .then(response => {
              // Tailor data Data comes with "ref" key but we want "name"
              const versionList = response.versions.map((elem, index) => {
                return {
                  url: elem.url,
                  name: elem.tag,
                  id: index
                };
              });

              // find index of selected node in the second level
              const index2ndLevel = dataToSet[indexToSet].children.findIndex(
                elem => elem.id === node.id
              );

              // Toggle the expansion of the panel
              const isExpanded = _get(
                dataToSet,
                [indexToSet, "children", index2ndLevel, "state", "expanded"],
                false
              );
              _set(
                dataToSet,
                [indexToSet, "children", index2ndLevel, "state"],
                {
                  expanded: !isExpanded
                }
              );

              // Set version list into the Tree
              _set(
                dataToSet,
                [indexToSet, "children", index2ndLevel, "children"],
                versionList
              );
              setData(dataToSet);
            })
            .catch(error => console.error(error));
        },
        2: () => {
          // Display the selected option
          setSelectedScopeItem(`${node.url}`);
        }
      };
      _get(mapObj, node.deepness, () => {})();
    },
    [scopeFilteredData]
  );

  const _getAllData = workspace => {
    getAllData(workspace, scopeFilteredData).then(combined => {
      setData(filterData(combined));
      setIsLoading(false);
    });
  };

  const confirmNodeSelection = node => {
    // Display the selected option and confirm selection
    if (node.deepness <= 1) return;
    setSelectedScopeItem(node.url);
    props.onSubmit(node.url);
  };

  const getModalTitle = scope => {
    const vowels = ["a", "e", "i", "o", "u"];
    const pronoun = vowels.includes(scope[0].toLowerCase())
      ? i18n.t("an")
      : i18n.t("a");
    return `${i18n.t("Select")} ${pronoun} ${i18n.t(scope)}`;
  };

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  const handleSubmit = useCallback(
    () => props.onSubmit(selectedScopeItem),
    [selectedScopeItem]
  );
  const handleNodeClick = useCallback(
    node => requestScopeVersions(node),
    [requestScopeVersions]
  );
  const handleChange = useCallback(nodes => setData(nodes), []);
  const handleNodeDoubleClick = useCallback(
    nodeData => confirmNodeSelection(nodeData),
    []
  );

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  React.useEffect(() => {
    // get all information in the scopes (not filtered by message)
    _getAllData(CONSTANTS.GLOBAL_WORKSPACE);
  }, []);

  // Filter Results based on props.filter
  useEffect(() => {
    if (isLoading || !props.filter) return;
    // Set filtered data
    setData(filterData(scopeFilteredData));
  }, [props.filter, setData, scopeFilteredData]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <AbstractModal
      onSubmit={handleSubmit}
      onCancel={props.onCancel}
      open={props.open}
      title={getModalTitle(props.scopeList[0])}
      width="50%"
    >
      <Grid data-testid="section_select-scope-modal" container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            paddingBottom: "6px",
            paddingTop: "10px"
          }}
        ></Grid>
        <Typography
          data-testid="section_basic-virtualized-tree"
          component="div"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            justifyContent: "center",
            width: "100%"
          }}
        >
          {isLoading ? (
            <Backdrop
              style={{
                position: "relative",
                height: "50vh",
                width: "inherit",
                color: "#fff",
                zIndex: 99999
              }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <BasicVirtualizedTree
              onClickNode={handleNodeClick}
              onDoubleClickNode={handleNodeDoubleClick}
              data={data}
              handleChange={handleChange}
              showIcons={false}
              height="400px"
            ></BasicVirtualizedTree>
          )}
        </Typography>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography
            data-testid="output_message"
            label={i18n.t("Message")}
            value={"selected"}
            margin="normal"
          >
            {selectedScopeItem === ""
              ? i18n.t("Nothing selected")
              : selectedScopeItem}
          </Typography>
        </Grid>
      </Grid>
    </AbstractModal>
  );
};

SelectScopeModal.propTypes = {
  allowArchive: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  open: PropTypes.bool,
  scopeList: PropTypes.array,
  message: PropTypes.string,
  selected: PropTypes.string,
  filter: PropTypes.func,
  data: PropTypes.array,
};

SelectScopeModal.defaultProps = {
  title: i18n.t("Insert Text here"),
  message: i18n.t("Are you sure?"),
  allowArchive: true,
  open: false,
  scopeList: ["Callback"],
  selected: ""
};

export default SelectScopeModal;
