import React from "react";
import PropTypes from "prop-types";
import _set from "lodash/set";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { Workspace } from "@mov-ai/mov-fe-lib-core";
import BasicVirtualizedTree from "../Tree/BasicVirtualizedTree";
import AbstractModal from "./AbstractModal";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import i18n from "../../i18n/i18n.js";

//========================================================================================
/*                                                                                      *
 *                                    TEMPORARY CODE                                    *
 *                                                                                      */
//========================================================================================

const SelectScopeModal = props => {
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

  const [data, setData] = React.useState(initialData);
  const [selectedWorkspace, setSelectedWorkspace] = React.useState("global");
  const [selectedScopeItem, setSelectedScopeItem] = React.useState(
    props.selected
  );
  const [workSpaceList, setWorkSpaceList] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const scopeFilteredData = initialData.filter(elem =>
    props.scopeList.includes(elem.scope)
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    //get list of workspace
    Workspace.getAll()
      .then(response => setWorkSpaceList(response))
      .catch(error => console.log(error));

    // get all information in the scopes (not filtered by message)
    getAllData(selectedWorkspace);
    //Unmount
    return () => {};
  }, [props.scopeList]);

  // Filter Results based on props.filter
  React.useEffect(() => {
    if (isLoading || selectedWorkspace !== "global" || !props.filter) return;
    const filteredData = _cloneDeep(data);
    data.forEach((scope, index) => {
      filteredData[index].children = scope.children.filter(props.filter);
    });
    // Set filtered data
    setData(filteredData);
  }, [props.filter, isLoading]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const changeWorkspace = evt => {
    // Update the selector
    setSelectedWorkspace(evt.target.value);
    // When you switch workspaces reset Data
    getAllData(evt.target.value);
    setIsLoading(true);
  };

  const getAllData = workspace => {
    const dataToSet = _cloneDeep(scopeFilteredData);

    dataToSet.forEach((element, index) => {
      // Get all scope items
      Workspace.getDocs({ workspace: workspace, scope: element.scope })
        .then(response => {
          let sortedScopeItems = response.scopes
            .sort((a, b) => a.ref.localeCompare(b.ref))
            .map((elem, i) => {
              return {
                id: i,
                url: elem.url,
                name: elem.ref,
                children: [{ name: "" }]
              };
            });

          dataToSet[index].children = sortedScopeItems;
          setData(dataToSet);
          setIsLoading(false);
        })
        .catch(error => console.error(error));
    });
  };

  const requestScopeVersions = node => {
    const dataToSet = _cloneDeep(data);
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
          workspace: selectedWorkspace,
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
            _set(dataToSet, [indexToSet, "children", index2ndLevel, "state"], {
              expanded: !isExpanded
            });

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
  };

  const confirmNodeSelection = node => {
    // Display the selected option and confirm selection
    if (selectedWorkspace !== "global" && node.deepness <= 1) return;
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

  return (
    <AbstractModal
      onSubmit={() => props.onSubmit(selectedScopeItem)}
      onCancel={props.onCancel}
      open={props.open}
      title={getModalTitle(props.scopeList[0])}
      width="50%"
    >
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            paddingBottom: "6px",
            paddingTop: "10px"
          }}
        >
          <FormControl style={{ width: "50%" }}>
            <InputLabel>{i18n.t("Workspace")}</InputLabel>
            <Select
              value={selectedWorkspace}
              onChange={changeWorkspace}
              disabled={!props.allowArchive}
            >
              {Object.keys(workSpaceList).map((key, index) => (
                <MenuItem key={index} value={key}>
                  {workSpaceList[key].label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Typography
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
              onClickNode={node => requestScopeVersions(node)}
              onDoubleClickNode={data => confirmNodeSelection(data)}
              data={data}
              handleChange={nodes => setData(nodes)}
              showIcons={false}
              height="400px"
            ></BasicVirtualizedTree>
          )}
        </Typography>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography
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
  filter: PropTypes.func
};

SelectScopeModal.defaultProps = {
  title: i18n.t("Insert Text here"),
  message: i18n.t("Are you sure?"),
  allowArchive: true,
  onSubmit: () => {},
  onCancel: () => {},
  open: false,
  scopeList: ["Callback"],
  selected: ""
};

export default SelectScopeModal;
