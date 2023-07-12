import { makeMagic, bindMagic } from "@tty-pt/styles";

makeMagic({
  logs: {
    tableContainer: {
      flexGrow: 1,
      minHeight: 0,
      overflow: "hidden"
    },
    external: {
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
  }
});

// Common styles
const logFilterCommonStyles = theme => {
  return {
    toggleContainer: {
      margin: theme.spacing(2),
    },
    smallToggleContainer: {
      display: "flex",
      justifyContent: "center"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300
    },
    iconAdornment: { marginRight: "15px" }
  };
};

export const useRobotSelectorStyles = bindMagic(logFilterCommonStyles)

export const useSearchInputStyles = bindMagic(theme => ({
  ...logFilterCommonStyles(theme),
  searchText: {
    minWidth: "150px",
    paddingLeft: theme.spacing(3)
  },
  smallSearchText: {
    marginLeft: "18px !important",
    paddingLeft: theme.spacing(3)
  }
}));

export const useSelectBoxStyle = bindMagic(theme => ({
  ...logFilterCommonStyles(theme),
  selectBox: { 
      minWidth: "290px" 
    },
  smallSelectBox: {
    width: "130px",
  }
}));

export const useTagsStyles = bindMagic(theme => ({
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

export const useSettingsStyles = bindMagic(theme => ({
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

export const useLogFilterStyles = bindMagic(theme => ({
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
