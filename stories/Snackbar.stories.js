import React from "react";
import Button from "../src/Components/Button";
import { snackbar } from "../src/Components/Snackbar/Snackbar";
import withNotification from "../src/Components/HOCs/withNotification";
import {
  Card,
  CardActions,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { ExpandMore, Close } from "@material-ui/icons";

const SnackButton = ({ severity }) => {
  return (
    <Button
      style={{ margin: "5px" }}
      onClick={() => snackbar({ message: `Example ${severity}`, severity })}
    >
      Open {severity}
    </Button>
  );
};

const TestContent = React.forwardRef(({ key, closeSnackbar }, ref) => {
  const [expanded, setExpanded] = React.useState(true);
  const data = ["Item 1", "Item 2", "Item 3"];

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => !oldExpanded);
  };

  return (
    <Card ref={ref}>
      <CardActions>
        <Typography variant="body2">Message Header</Typography>
        <div>
          <IconButton
            aria-label="Show more"
            size="small"
            onClick={handleExpandClick}
          >
            <ExpandMore />
          </IconButton>
          <IconButton size="small" onClick={closeSnackbar(key)}>
            <Close fontSize="small" />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {data.length &&
          data.map((item) => {
            return <Paper key={item}>{item}</Paper>;
          })}
      </Collapse>
    </Card>
  );
});

const ExpandableSnackbar = () => {
  return (
    <Button
      style={{ margin: "5px" }}
      onClick={() =>
        snackbar({
          persist: true,
          vertical: "top",
          horizontal: "right",
          content: (closeSnackbar) => (key) => (
            <TestContent key={key} closeSnackbar={closeSnackbar} />
          ),
        })
      }
    >
      Open Expandable Sanckbar
    </Button>
  );
};

const AllSnacks = () => {
  return (
    <div>
      <div>
        <SnackButton severity="success" />
        <SnackButton severity="warning" />
        <SnackButton severity="info" />
        <SnackButton severity="error" />
      </div>
      <div>
        <ExpandableSnackbar />
      </div>
    </div>
  );
};

const Template = () => {
  const Snacks = withNotification(AllSnacks);
  return <Snacks />;
};

export const snackStory = Template.bind({});

snackStory.story = {
  name: "App Snackbar",
};

export default {
  title: "Snackbar",
};
