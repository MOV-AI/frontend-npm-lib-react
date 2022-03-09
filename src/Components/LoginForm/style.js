const commonStyles = {
  formControl: {
    width: "50%"
  }
};
const styles = theme => ({
  ...commonStyles,
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
  ...commonStyles,
  container: {
    flexGrow: 1
  },
  expandCollapseButton: {
    width: "50%",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "0px",
    marginTop: "12px"
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
