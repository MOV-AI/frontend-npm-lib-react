import React, { useCallback, useEffect, useState, useMemo } from "react";
import { makeMagic, bindMagic, withSvg } from "@tty-pt/styles";
import Rest from "@mov-ai/mov-fe-lib-core/api/Rest/Rest";
import { easySub, useSub, authSub } from "./../HOCs/withAuthentication";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { User } from "@mov-ai/mov-fe-lib-core";
import AppsIcon from "@mui/icons-material/Apps";
import AdminBoardSvg from "./../../resources/AdminBoard.svg";
import FleetBoardSvg from "./../../resources/FleetBoard.svg";
import IDESvg from "./../../resources/IDE.svg";
import LayoutSvg from "./../../resources/Layout.svg";
import TaskManagerSvg from "./../../resources/Task Manager.svg";
import { APP_TYPES, LAUNCHER_APP } from "../../Utils/Constants";
import i18n from "../../i18n/i18n.js";
import HomeMenuSkeleton from "./HomeMenuSkeleton";
import { App } from "./types";

makeMagic({
  homeMenuPopper: {
    top: "48px !important",
    "& > *": {
      boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
      height: "calc(100vh - 48px)",
    },
  },
  homeMenu: {
    width: "344px",
    "& > *": {
      width: "166px",
      height: "138px",
      fontSize: "16px",
    }
  },
});

function ClickAway(props) {
  const { anchorEl, popperPlacement, onClickAway, children, className } = props;

  return (<Popper
    data-testid="section_popper"
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    placement={popperPlacement}
    className={className}
    transition
  >
    <ClickAwayListener onClickAway={onClickAway}>
      {children}
    </ClickAwayListener>
  </Popper>);
}

function ClickAwayButton(props) {
  const { Icon, popperPlacement, children, className, popperClass } = props;
  const [ anchorEl, setAnchorEl ] = useState(null);

  return (<>
    <IconButton onClick={useCallback((e: Event) => setAnchorEl(e.target), [])}>
      <Icon />
    </IconButton>

    <ClickAway
      data-testid="section_popper"
      anchorEl={anchorEl}
      placement={popperPlacement}
      onClickAway={() => setAnchorEl(null)}
      className={className}
      popperClass={popperClass}
      transition
    >
      { children }
    </ClickAway>
  </>);
}

async function getAllApps() {
  const { result } = await Rest.get({ path: `v1/applications/` });
  return result;
}

function capitalize(str) {
  return str.split(" ").map(word => word.substring(0, 1).toUpperCase() + word.substring(1)).join(" ");
}

/**
 * getLayoutUrl - obtains the url of the layout
 * @param {object} e application's object
 *
 * Currently, the layout viewer is distributed in the mov-fe-app-ide package
 */
function getLayoutUrl(url) {
  return `${window.location.origin}/api/v1/apps/mov-fe-app-ide/?app_mode=1&layout_id=${url}&workspace=global`;
};

/**
 * getAppUrl - obtains the url of the app
 * @param {object} e application's object
 * @param {boolean} ctrlKey ctrlKey pressed
 */
function getAppUrl(url) {
  return `${window.location.origin}/api/v1/apps/${url}/`;
};

/**
 * getUrl: gets external page URL
 * @param {object} e application's object
 */
function getUrl(url) {
  return url;
};

const resourcesMap = {
  application: getAppUrl,
  layout: getLayoutUrl,
  external: getUrl,
  default: getUrl
};

const baseMap = {
  AdminBoard: {
    id: "AdminBoard",
    Icon: withSvg(AdminBoardSvg),
    url: resourcesMap.application("AdminBoard"),
    title: "Admin Board",
    color: "success",
    order: 3,
  },
  FleetBoard: {
    id: "FleetBoard",
    Icon: withSvg(FleetBoardSvg),
    url: resourcesMap.application("FleetBoard"),
    title: "Fleet Board",
    color: "info",
    order: 2,
  },
  "mov-fe-app-ide": {
    id: "mov-fe-app-ide",
    Icon: withSvg(IDESvg),
    url: resourcesMap.application("mov-fe-app-ide"),
    title: "Flow",
    color: "pink",
    order: 0,
  },
  "mov-fe-app-taskmanager": {
    id: "mov-fe-app-taskmanager",
    Icon: withSvg(TaskManagerSvg),
    url: resourcesMap.application("mov-fe-app-taskmanager"),
    title: "Task Manager",
    color:"purple",
    order: 1,
  }
};

export
const appsSub = easySub([]);

function appOrder(id) {
  return baseMap[id]?.order ?? 100;
}

const appsEmit = appsSub.easyEmit(async ({ currentUser }) => {
  if (!currentUser)
    return [];

  const startApps = (currentUser?.Resources?.Applications ?? [])
    .filter(app => app !== "mov-fe-app-launcher")
    .sort((a, b) => appOrder(a) - appOrder(b));

  appsSub.update(startApps.map(app => baseMap[app]));

  const received = (await getAllApps()).map(app => {
    const id = app.Type === "layout" ? app.Label : app.URL;

    return baseMap[id] ?? {
      id,
      Icon: withSvg(LayoutSvg),
      title: capitalize(id),
      url: resourcesMap[app.Type](id),
      version: app.Version,
      color:"gray-light",
      order: 1,
    };
  });

  const apps = received.filter(
    app => (currentUser?.Resources?.Applications ?? []).includes(app.id)
  ).sort(
    (a, b) => appOrder(a.id) - appOrder(b.id),
  );

  return apps;
});

authSub.subscribe(appsEmit);

function appsMap(element) {
  const { title, id, Icon, url, color } = element;

  return (<ButtonBase
    key={id}
    LinkComponent="a"
    href={url} 
    className={"text-decoration background vertical paper pad-big item-box hover-" + color}
  >
    <div><Icon /></div>
    <div className="hover">{ title }</div>
  </ButtonBase>);
}

const appsElSub = easySub([]);
const appsElEmit = appsElSub.easyEmit(apps => apps.map(appsMap));
appsSub.subscribe(appsElEmit);

// import { homeMenuPopperStyles } from "./styles";

const HomeMenuPopper = () => {
  // State hooks
  const [currentApps, setCurrentApps] = useState<App[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const appsEl = useSub(appsElSub);

  //========================================================================================
  /*                                                                                      *
   *                                      SUBSCRIBERS                                     *
   *                                                                                      */
  //========================================================================================
  /**
   * subscribe to Applications updates
   */
  useEffect(() => {
    (new User())
      .getAllApps()
      .then(res => {
        res.success && setCurrentApps(res.result as any);
      })
      .catch(err => {
        setErrorMessage(err.statusText);
      });
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  const redirectToLocalhost = useCallback(() => {
    window.location.replace(window.location.origin); // go to localhost or localhost:3000
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                        RENDERS                                       *
   *                                                                                      */
  //========================================================================================

  if (errorMessage)
    return (<ClickAwayButton
      Icon={AppsIcon}
    >
      <Paper>
        <div
          className="no-applications"
          data-testid="section_no-applications"
        >
          <Typography variant="subtitle1">
            {i18n.t("NoApplications") as string}
          </Typography>
          <Button
            data-testid="input_launcher"
            size="large"
            variant="outlined"
            color="primary"
            className="launcher-button"
            onClick={redirectToLocalhost}
          >
            {LAUNCHER_APP.toUpperCase()}
          </Button>
        </div>
      </Paper>
    </ClickAwayButton>);

  if (!currentApps)
    return (<ClickAwayButton Icon={AppsIcon}>
      <Paper><HomeMenuSkeleton /></Paper>
    </ClickAwayButton>);

  const arrayOfApplications: App[] = [];
  const arrayOfExternalApps: App[] = [];
  const arrayOfLayouts: App[] = [];

  currentApps.forEach((app: App) => {
    const appType = app.Type;

    if (appType === APP_TYPES.APPLICATION && app.Label !== LAUNCHER_APP)
      arrayOfApplications.push(app);
    if (appType === APP_TYPES.EXTERNAL) arrayOfExternalApps.push(app);
    if (appType === APP_TYPES.LAYOUT) arrayOfLayouts.push(app);
  });

  return (<ClickAwayButton
    Icon={AppsIcon}
    className="home-menu-popper"
  >
    <div className="background-gray-dark pad-medium">
      <div
        data-testid="section_wrapper"
        className="home-menu horizontal-medium-small flex-wrap box-sizing"
      >
        { appsEl }
      </div>
    </div>
  </ClickAwayButton>);
};

export default HomeMenuPopper;
