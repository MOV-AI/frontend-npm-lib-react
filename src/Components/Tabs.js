import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTabs from "@mui/material/MaterialTabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, selectedTab, index, ...other } = props;

  return (
    <Typography
      data-testid="section_tab"
      component="div"
      role="tabpanel"
      hidden={selectedTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {selectedTab === index && children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  selectedTab: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  tabPanel: {
    flexGrow: 1,
    minHeight: 0,
    height: "calc(100% - 48px)",
    overflowY: "auto"
  }
}));

export default function Tabs(props) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(props.selectedTab);

  React.useEffect(() => {
    if (props.selectedTab !== selectedTab) {
      setSelectedTab(props.selectedTab);
    }
  }, [props.selectedTab]);

  const handleChange = (event, newSelectedTab) => {
    setSelectedTab(newSelectedTab);
  };

  return (
    <div data-testid="section_tabs-wrapper" className={classes.root}>
      <MaterialTabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {props.tabList.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </MaterialTabs>
      {props.tabList.map((tab, index) => (
        <TabPanel
          key={index}
          selectedTab={selectedTab}
          index={index}
          className={props.scrollable ? classes.tabPanel : undefined}
        >
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabList: PropTypes.array,
  selectedTab: PropTypes.number,
  scrollable: PropTypes.bool
};

Tabs.defaultProps = {
  tabList: [
    { label: "Tab 1", component: <div>Component 1</div> },
    {
      label: "Tab 2",
      component: (
        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      )
    },
    { label: "Tab 3", component: <div>Component 3</div> }
  ],
  selectedTab: 0,
  scrollable: true
};
