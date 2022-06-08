import { makeStyles } from "@material-ui/core/styles";

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
      margin: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
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
    paddingLeft: theme.spacing(3)
  }
}));

export const useSelectBoxStyle = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  selectBox: { minWidth: "290px" }
}));

export const useTagsStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  addTagText: {
    width: "100%"
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0.5),
    margin: theme.spacing(0, 3, 0, 3)
  },
  tagsList: {
    marginTop: theme.spacing(3)
  },
  chip: {
    margin: theme.spacing(0.5)
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
    margin: theme.spacing(0, 3, 0, 3)
  }
}));

export const useLogFilterStyles = makeStyles(theme => ({
  ...logFilterCommonStyles(theme),
  spacer: { flexGrow: 1 }
}));
