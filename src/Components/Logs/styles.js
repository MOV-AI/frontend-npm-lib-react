import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(_theme => ({
  tableContainer: {
    flexGrow: 1,
    minHeight: 0,
    overflow: "hidden"
  },
  externalDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  noRows: {
    display: "flex",
    fontSize: "20px",
    justifyContent: "center",
    padding: "32px"
  },
  wrapper: {
    flexGrow: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }
}));

// Common styles
const logFilterCommonStyles = theme => {
  return {
    toggleContainer: {
      margin: theme.spacing(2) + " !important",
    },
    smallToggleContainer: {
      display: "flex",
      justifyContent: "center"
    },
    formControl: {
      margin: theme.spacing(1) + " !important",
      minWidth: 120,
      maxWidth: 300
    },
    iconAdornment: { marginRight: "15px" }
  };
};

export const useRobotSelectorStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme)
}));

export const useSearchInputStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  searchText: {
    minWidth: "150px",
    paddingLeft: theme.spacing(3) + " !important",
  },
  smallSearchText: {
    marginLeft: "18px !important",
    paddingLeft: theme.spacing(3) + " !important",
  }
}));

export const useSelectBoxStyle = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  selectBox: { 
      minWidth: "290px" 
    },
  smallSelectBox: {
    width: "130px",
  }
}));

export const useTagsStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  addTagText: {
    width: "100%"
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0.5) + " !important",
    margin: theme.spacing(0, 3, 0, 3) + " !important",
  },
  tagsList: {
    marginTop: theme.spacing(3) + " !important",
  },
  chip: {
    margin: theme.spacing(0.5) + " !important",
  }
}));

export const useSettingsStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  filtersButton: {
    display: "flex",
    flexDirection: "row"
  },
  columnsFilter: {
    display: "flex",
    flexDirection: "column",
    marginTop: "6px"
  },
  inputHeader: {
    fontSize: "1rem",
    fontFamily: "Open Sans",
    fontWeight: 500
  },
  limitText: {
    width: "50px",
    margin: theme.spacing(0, 3, 0, 3) + " !important",
  },
}));

export const useLogFilterStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  flexContainer: {
    flex: 1,
  },
  doubleFlexContainer: {
    flex: 2,
  },
  displayFlex: { display: "flex" },
  spaceBetween: {justifyContent: "space-between" },
  flexEnd: {justifyContent: "flex-end" },
  center: {justifyContent: "center" },
}));
