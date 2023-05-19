import React, { useEffect, useCallback, useState } from "react";
import { usePopper } from 'react-popper';
import { makeMagic, withSvg } from "@tty-pt/styles";
import Rest from "@mov-ai/mov-fe-lib-core/api/Rest/Rest";
import { easySub, useSub, authSub } from "./../HOCs/withAuthentication";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import AppsIcon from "@mui/icons-material/Apps";
import AdminBoardSvg from "./../../resources/AdminBoard.svg";
import FleetBoardSvg from "./../../resources/FleetBoard.svg";
import IDESvg from "./../../resources/IDE.svg";
import LayoutSvg from "./../../resources/Layout.svg";
import TaskManagerSvg from "./../../resources/Task Manager.svg";
import HomeMenuSkeleton from "./HomeMenuSkeleton";

makeMagic({
  homeMenuPopper: {
    transform: "none !important",
    top: "48px !important",
    height: "calc(100vh - 48px)",
    "& > *": {
      boxShadow: "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
      height: "calc(100vh - 48px)",
      boxSizing: "border-box",
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

export
function PopperButtonBase(props: any) {
  const {
    Icon, id = "", popperPlacement, children,
    className = "", openState, keepOpen,
  } = props;
  const [ open, setOpen ] = openState;
  const [referenceElement, setReferenceElement] = useState(null);

  const clickHandler = useCallback((ev) => {
    console.log("clickHandler", ev);
    setReferenceElement(null);
    setOpen(false);
  }, [setReferenceElement]);

  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: popperPlacement,
  });
  const showClass = open ? "" : " display-none";

  return (<>
    <IconButton aria-describedby={id} data-testid={props["data-testid"]} onClick={e => {
      setReferenceElement(e.target);
      setOpen(true);;
      e.stopPropagation();
    }}>
      <Icon />
    </IconButton>

    <div className={"absolute z-900 position-0" + showClass} onClick={clickHandler} />
    <div ref={setPopperElement} className={className + " z-901" + showClass} style={styles.popper} {...attributes.popper }>
      { open || keepOpen ? children : null }
    </div>
  </>);
}

export
function PopperButton(props: any) {
  const { children, ...rest } = props;
  const openState = useState(false);

  return (<PopperButtonBase openState={openState} {...rest}>
    { props.children }
  </PopperButtonBase>);
}

let getAllApps = async function getAllApps() {
  const { result } = await Rest.get({ path: `v1/applications/` });
  return result;
};

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

export
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

const layoutBase = {
  Icon: withSvg(LayoutSvg),
  color:"gray-light",
};

export
const appsEmit = appsSub.easyEmit(async function _appsEmit({ currentUser }) {
  if (!currentUser)
    return [];

  const startApps = (currentUser?.Resources?.Applications ?? [])
    .filter(app => app !== "mov-fe-app-launcher")
    .sort((a, b) => appOrder(a) - appOrder(b));

  appsSub.update(startApps.map(app => baseMap[app]));

  const received = (await getAllApps())
    .map(app => {
      const id = app.id ?? (app.Type === "layout" ? app.Label : app.URL);

      if (
        id === "mov-fe-app-launcher"
        || (app.Type === "application" && !(currentUser?.Resources?.Applications ?? []).includes(id))
      )
        return null;

      return baseMap[id] ?? {
        ...layoutBase,
        id,
        title: capitalize(id),
        url: resourcesMap.layout(id),
        version: app.Version,
      };
    }).filter(a => a);

  const apps = received.sort(
    (a, b) => appOrder(a.id) - appOrder(b.id),
  );

  return apps;
});

function appsMap(element) {
  const { title, id, Icon, url, color } = element;

  return (<ButtonBase
    key={id}
    LinkComponent="a"
    href={url} 
    data-testid={"home-menu-link-" + id}
    className={"text-decoration background vertical paper pad-big item-box hover-" + color}
  >
    <div><Icon /></div>
    <div className="hover">{ title }</div>
  </ButtonBase>);
}

const appsElSub = easySub([]);

export
const appsElEmit = appsElSub.easyEmit(async function (apps) {
  return apps.map(appsMap);
});

if ((window as any).mock)
  getAllApps = async () => Object.values(baseMap).map(app => ({
    id: app.id,
    Type: "application",
    Label: app.title,
    URL: app.url,
    Version: app.version
  }));

authSub.subscribe(appsEmit);
appsSub.subscribe(appsElEmit);

// import { homeMenuPopperStyles } from "./styles";

const HomeMenuPopper = () => {
  // State hooks
  const appsEl = useSub(appsElSub);

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

  // if (errorMessage)
  //   return (<PopperButton
  //     Icon={AppsIcon}
  //   >
  //     <Paper>
  //       <div
  //         className="no-applications"
  //         data-testid="section_no-applications"
  //       >
  //         <Typography variant="subtitle1">
  //           {i18n.t("NoApplications") as string}
  //         </Typography>
  //         <Button
  //           data-testid="input_launcher"
  //           size="large"
  //           variant="outlined"
  //           color="primary"
  //           className="launcher-button"
  //           onClick={redirectToLocalhost}
  //         >
  //           {LAUNCHER_APP.toUpperCase()}
  //         </Button>
  //       </div>
  //     </Paper>
  //   </PopperButton>);

  if (!appsEl)
    return (<PopperButton data-testid="home-menu" Icon={AppsIcon}>
      <Paper><HomeMenuSkeleton /></Paper>
    </PopperButton>);

  return (<PopperButton
    Icon={AppsIcon}
    className="home-menu-popper"
    data-testid="home-menu-popper"
  >
    <div data-testid="home-menu" className="background-gray-dark pad-medium">
      <div
        className="home-menu horizontal-medium-small flex-wrap box-sizing"
      >
        { appsEl }
      </div>
    </div>
  </PopperButton>);
};

export default HomeMenuPopper;
