const common = {
  formControl: {
    width: "40%"
  }
};
const styles = theme => ({
  ...common,
  root: {
    padding: theme.spacing(4, 4),
    borderRadius: 40
  },
  container: {
    paddingTop: "5%"
  },
  logoImage: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%"
  }
});

const advancedSectionStyles = theme => ({
  ...common,
  container: {
    flexGrow: 1
  },
  expandCollapseButton: {
    width: "40%",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "0px",
    marginTop: "12px",
    "&:focus-visible": {
      backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
  },
  label: {
    fontSize: "11px"
  },
  providerSelectorInput: {
    display: "flex"
  },
  grid: {
    justifyContent: "center"
  }
});

export { styles, advancedSectionStyles };
