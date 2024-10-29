const common = {
  formControl: {
    width: "40%",
  },
};
const styles = () => ({
  ...common,
  root: {
    padding: "32px 32px !important",
    borderRadius: "40px !important",
    gap: "16px",
    display: "flex",
  },
  container: {
    height: "100%",
  },
  logoImage: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
});

const advancedSectionStyles = (_theme) => ({
  ...common,
  container: {
    flexGrow: 1,
  },
  expandCollapseButton: {
    width: "40%",
    justifyContent: "space-between",
    paddingLeft: "1px",
    paddingRight: "0px",
    marginTop: "12px",
    "&:focus-visible": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  label: {
    fontSize: "11px",
  },
  providerSelectorInput: {
    display: "flex",
  },
  grid: {
    justifyContent: "center",
  },
});

export { styles, advancedSectionStyles };
