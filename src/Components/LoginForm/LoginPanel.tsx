import React from "react";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from "@mui/styles";
{/* import { styles } from "./style"; */}
import LogoSvg from "../../resources/Logo";

interface NotAuthorizedProps {
  message: React.ReactNode;
  progress?: boolean;
  logo?: string;
  title?: string;
}

function NotAuthorized(props: NotAuthorizedProps): React.ReactElement {
  const {
    title = "",
    message = "",
    progress = false
  } = props;

  return (<div className="pad-big min-size-vertical-view-big-neg vertical-0 align-items text-align justify-content-space-around">
    <LogoSvg />
    <Paper elevation={10}
      data-testid="section_login-panel"
      className="not-authorized vertical-big border-radius-small size-horizontal-three-fourths"
    >
      { title ? (<div data-testid="output_title" className="text-align h-2">
        {title}
      </div>) : null }
      <div data-testid="output_message" className="size-horizontal subtitle-1">
        {message}
      </div>
      { progress && <LinearProgress color="secondary" /> }
    </Paper>
  </div>);
}

export default withStyles(theme => ({
  notAuthorized: {
    background: theme.palette.background.grad,
    padding: "86px",
    width: "calc(438px - 2 * 86px)",
  },
}))(NotAuthorized);
