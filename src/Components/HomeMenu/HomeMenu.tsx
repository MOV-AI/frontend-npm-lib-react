import React, { useCallback, useState, useRef } from "react";
import { usePopper } from 'react-popper';
import { makeMagic } from "@tty-pt/styles";
import { Rest } from "@mov-ai/mov-fe-lib-core";
import { Sub } from "@tty-pt/sub";
import { authSub } from "./../HOCs/withAuthentication";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import AppsIcon from "@mui/icons-material/Apps";
import AdminBoardSvg from "./../../../src/resources/AdminBoard.svg";
import FleetBoardSvg from "./../../../src/resources/FleetBoard.svg";
import IdeSvg from "./../../../src/resources/IDE.svg";
import LayoutSvg from "./../../../src/resources/Layout.svg";
import TaskManagerSvg from "./../../../src/resources/Task Manager.svg";
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

interface PopperProps {
  Icon: React.ComponentType;
  id: string;
  popperPlacement: any;
  children: React.ReactNode;
  className: string;
  openState: [boolean, Function];
  keepOpen: boolean;
};

export
function PopperButtonBase(props: PopperProps) {
  const {
    Icon, id = "", popperPlacement, children,
    className = "", openState, keepOpen,
  } = props;
  const [ open, setOpen ] = openState;
  const [referenceElement, setReferenceElement] = useState<EventTarget|null>(null);

  const clickHandler = useCallback(() => {
    setReferenceElement(null);
    setOpen(false);
  }, [setReferenceElement]);

  {/* const [popperElement, setPopperElement] = useState(null); */}
  const popperRef = useRef<HTMLDivElement>();
  const { styles, attributes } = usePopper(referenceElement as Element, popperRef.current, {
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
    <div ref={popperRef as React.LegacyRef<HTMLDivElement>} className={className + " z-901" + showClass} style={styles.popper} {...attributes.popper }>
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

function capitalize(str: string) {
  return str.split(" ").map(word => word.substring(0, 1).toUpperCase() + word.substring(1)).join(" ");
}

/**
 * getLayoutUrl - obtains the url of the layout
 * @param {object} e application's object
 *
 * Currently, the layout viewer is distributed in the mov-fe-app-ide package
 */
function getLayoutUrl(url: string) {
  return `${window.location.origin}/api/v1/apps/mov-fe-app-ide/?app_mode=1&layout_id=${url}&workspace=global`;
};

/**
 * getAppUrl - obtains the url of the app
 * @param {object} e application's object
 * @param {boolean} ctrlKey ctrlKey pressed
 */
function getAppUrl(url: string) {
  return `${window.location.origin}/api/v1/apps/${url}/`;
};

/**
 * getUrl: gets external page URL
 * @param {object} e application's object
 */
function getUrl(url: string) {
  return url;
};

const resourcesMap = {
  application: getAppUrl,
  layout: getLayoutUrl,
  external: getUrl,
  default: getUrl
};

interface App {
  id: string;
  Icon: React.ComponentType | string;
  url: string;
  title: string;
  color: string;
  order: number;
  version?: string;
}

export
const baseMap: { [key: string]: App } = {
  AdminBoard: {
    id: "AdminBoard",
    Icon: () => <img src={AdminBoardSvg} />,
    url: resourcesMap.application("AdminBoard"),
    title: "Admin Board",
    color: "success",
    order: 3,
  },
  FleetBoard: {
    id: "FleetBoard",
    Icon: () => <img src={FleetBoardSvg} />,
    // Icon: FleetBoardSvg,
    url: resourcesMap.application("FleetBoard"),
    title: "Fleet Board",
    color: "info",
    order: 2,
  },
  "mov-fe-app-ide": {
    id: "mov-fe-app-ide",
    Icon: () => <img src={IdeSvg} />,
    // Icon: IdeSvg,
    url: resourcesMap.application("mov-fe-app-ide"),
    title: "Flow",
    color: "pink",
    order: 0,
  },
  "mov-fe-app-taskmanager": {
    id: "mov-fe-app-taskmanager",
    Icon: () => <img src={TaskManagerSvg} />,
    // Icon: TaskManagerSvg,
    url: resourcesMap.application("mov-fe-app-taskmanager"),
    title: "Task Manager",
    color:"purple",
    order: 1,
  }
};

export
const appsSub = new Sub([]);

function appOrder(id: string) {
  return baseMap[id]?.order ?? 100;
}

const layoutBase = {
  Icon: LayoutSvg,
  color:"gray-light",
};

export
const appsEmit = appsSub.makeEmit(function _appsEmit({ currentUser }: { currentUser: any }, allApps: []) {
  console.log(currentUser, allApps);
  if (!currentUser)
    return [];

  const startApps = (currentUser?.Resources?.Applications ?? [])
    .filter((app: string) => app !== "mov-fe-app-launcher")
    .sort((a: string, b: string) => appOrder(a) - appOrder(b));

  appsSub.update(startApps.map((app: string) => baseMap[app]));

  const received = (allApps)
    .map((app: any) => {
      const id = app.id ?? (app.Type === "layout" ? app.Label : app.URL);

      if (
        id === "mov-fe-app-launcher"
        // || (app.Type === "application" && !(currentUser?.Resources?.Applications ?? []).includes(id))
      )
        return null;

      return baseMap[id] ?? {
        ...layoutBase,
        id,
        title: capitalize(id),
        url: resourcesMap.layout(id),
        version: app.Version,
      };
    }).filter((a: App|null) => a);

  const apps = received.sort(
    (a: App, b: App) => appOrder(a.id) - appOrder(b.id),
  );

  return apps;
});

function appsMap(element: App) {
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

const appsElSub = new Sub([]);

export
const appsElEmit = appsElSub.makeEmit(function (apps: App[] = []) {
  console.log("appsElEmit", apps);
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

authSub.subscribe(async (auth: any) => {
  const allApps = await getAllApps();
  console.log("allApps", auth, allApps);
  return appsEmit(auth, allApps);
});

appsSub.subscribe(appsElEmit);

// import { homeMenuPopperStyles } from "./styles";

const HomeMenuPopper = () => {
  // State hooks
  const appsEl = appsElSub.use();

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
    data-testid="home-menu"
  >
    <div data-testid="home-menu-popper" className="background-gray-dark pad-medium">
      <div
        className="home-menu horizontal-medium-small flex-wrap box-sizing"
      >
        { appsEl }
      </div>
    </div>
  </PopperButton>);
};

export default HomeMenuPopper;
