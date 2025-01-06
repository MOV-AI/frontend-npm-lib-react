import React, {
  useState,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { ButtonBase, Modal, Paper } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SettingsIcon from "@material-ui/icons/Settings";
import i18n from "./../i18n";
import { extract } from "./../Utils/utils";
import useSize from "./../hooks/useSize";
import withError from "./HOCs/withError";
import ScrollButton from "./ScrollButton";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import "./../styles/style.css";

export const NavContext = React.createContext();
const isMobile = /Mobi/i.test(window.navigator.userAgent);

function MobileApp(props) {
  const { Navigation, View, mobileRef } = props;
  return (
    <>
      <div className="mobile overflow flex-grow box-shadow-inset min-size-vertical-0 position-relative">
        <View mobile />
        <ScrollButton />
      </div>

      <Paper
        ref={mobileRef}
        className="mobile horizontal-0 nav-container overflow-visible"
      >
        <Navigation />
      </Paper>
    </>
  );
}

function DesktopApp(props) {
  const { Navigation, View } = props;

  return (
    <div className="horizontal-0 bottom-container">
      <Paper className="vertical-0 nav-container color-disabled">
        <Navigation />
      </Paper>

      <div className="overflow box-shadow-inset flex-grow min-size-vertical-0">
        <View />
        <ScrollButton />
      </div>
    </div>
  );
}

function NavChild(props) {
  const { entry } = props;
  const [key, child] = entry;
  const Icon = child.Icon;
  const iconC = child.isActive() ? "icon-selected" : "icon";

  return (
    <ButtonBase
      data-testid={"nav-child-" + key}
      key={key}
      className="nav-child"
      onClick={props.onClick || child.onClick}
    >
      <Icon className={child.iconClassName + " font-size-24 " + iconC} />
      <span>{child.name}</span>
    </ButtonBase>
  );
}

NavChild.propTypes = {
  entry: PropTypes.array,
  onClick: PropTypes.func,
  isActive: PropTypes.func,
};

function entryMap(entry, idx) {
  return <NavChild key={entry[0]} entry={entry} idx={idx} />;
}

export default function Navigable(props = {}) {
  const {
    routes = {},
    limit: propLimit = 10,
    decorate = withError,
    viewProps = {},
    decorateArgs = [],
    ...rest
  } = props;
  const [open, setOpen] = useState(false);
  const allRoutes = useMemo(
    () => ({
      ...routes,
      [`/settings`]: {
        Menu: ProfileMenu,
        Icon: SettingsIcon,
        name: i18n.t("Settings"),
      },
    }),
    [routes],
  );
  const defaultPath = useMemo(() => Object.keys(allRoutes)[0], [allRoutes]);
  const [path, innerGo] = useState(location.pathname);
  const matchPath = useMemo(
    () =>
      Object.keys(allRoutes).filter((key) => {
        const pathSplits = path.split("/");
        const keySplits = key.split("/");
        for (let i = 0; i < pathSplits.length; i++) {
          if (typeof keySplits[i] === "string" && keySplits[i].startsWith(":"))
            continue;
          if (keySplits[i] !== pathSplits[i])
            return i === pathSplits.length - 1 && pathSplits[i] === "";
        }
        return true;
      })?.[0] ?? defaultPath,
    [allRoutes, path],
  );
  const urlParams = location.pathname.split("/");
  const stateUrlParams = matchPath.split("/");
  const params = (() => {
    const ret = {};

    for (let i = 0; i < stateUrlParams.length; i++)
      if (urlParams[i] !== stateUrlParams[i]) {
        if (stateUrlParams[i].startsWith(":"))
          ret[stateUrlParams[i].substring(1)] = urlParams[i];
        else break;
      }

    return ret;
  })();

  const go = useCallback(
    (arg) => {
      const pathname = typeof arg === "string" ? arg : arg.pathname;
      history.pushState(null, "", pathname);
      innerGo(pathname);
    },
    [innerGo],
  );

  const entries = useMemo(
    () =>
      Object.entries(allRoutes)
        .filter((entry) => entry[1].Icon)
        .map(([key, value]) => [
          key,
          {
            ...value,
            onClick: () => go({ pathname: key }),
          },
        ]),
    [allRoutes],
  );

  const [menuEntries, noMenuEntries] = useMemo(
    () => extract(entries, (entry) => entry[1]?.Menu || false),
    [entries],
  );

  const noMenuMap = useCallback(
    function noMenuMap([key, value]) {
      return [
        key,
        {
          ...value,
          isActive: () => key === matchPath,
          onClick: () => {
            value.onClick();
            setOpen(false);
          },
        },
      ];
    },
    [setOpen, matchPath],
  );

  const mMenuEntries = useMemo(
    () =>
      menuEntries.map(
        isMobile
          ? ([key, value]) => [
              key,
              {
                ...value,
                isActive: () => key === matchPath,
                onClick: () => {
                  value.onClick();
                  setOpen(false);
                },
              },
            ]
          : noMenuMap,
      ),
    [menuEntries, setOpen, noMenuMap, matchPath],
  );

  const menuEntriesEl = useMemo(
    () =>
      mMenuEntries.map(
        isMobile
          ? entryMap
          : (entry) => {
              const Menu = entry[1].Menu;
              return <Menu key={entry[0]} {...viewProps} />;
            },
      ),
    [mMenuEntries, viewProps],
  );

  const noMenuEntriesEl = useMemo(
    () => noMenuEntries.map(noMenuMap).map(entryMap),
    [noMenuEntries, noMenuMap],
  );

  const allEntriesEl = useMemo(
    () =>
      isMobile
        ? noMenuEntriesEl.concat(menuEntriesEl)
        : noMenuEntriesEl
            .concat([<div style={{ flexGrow: 1 }} key="sep" />])
            .concat(menuEntriesEl),
    [noMenuEntriesEl, menuEntriesEl],
  );

  const [limit, setLimit] = useState(propLimit);

  const mobileRef = useRef(null);

  if (isMobile)
    useSize(() => {
      const cur = mobileRef.current;

      if (!cur) return;

      const ratio = cur.clientWidth / cur.scrollWidth;

      if (ratio < 1) setLimit(Math.floor(limit * ratio));
    });

  const Navigation = useCallback(
    function Navigation() {
      return (
        <NavContext.Provider value={{ go }}>
          {isMobile ? allEntriesEl.slice(0, limit) : allEntriesEl}

          {isMobile && limit < allEntriesEl.length
            ? entryMap(
                [
                  "more",
                  {
                    name: i18n.t("More"),
                    Icon: MoreHorizIcon,
                    onClick: () => setOpen(true),
                    isActive: () => open,
                  },
                ],
                limit,
              )
            : null}

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            className="pad horizontal-0 position-bottom-0 inset-revert"
          >
            <Paper className="nav-modal horizontal align-content-end justify-content-space-evenly">
              {allEntriesEl}
            </Paper>
          </Modal>
        </NavContext.Provider>
      );
    },
    [allEntriesEl, limit, open],
  );

  const current = allRoutes[matchPath];

  const MenuView = useCallback(
    function MenuView(props) {
      const Menu = current.Menu;

      return (
        <NavContext.Provider value={{ go, params }}>
          <Menu view {...props} />
        </NavContext.Provider>
      );
    },
    [current?.Menu, go],
  );

  const View = useCallback(
    function View(props) {
      const Component = current.Component;

      return (
        <NavContext.Provider value={{ go, params }}>
          <Component {...props} {...viewProps} />
        </NavContext.Provider>
      );
    },
    [current.Component, go, viewProps],
  );

  const FinalView = useCallback(
    function FinalView(otherProps) {
      const ViewComponent = decorate(
        current.Component ? View : MenuView,
        ...decorateArgs,
      );
      return <ViewComponent {...viewProps} {...otherProps} />;
    },
    [MenuView, View, go, viewProps],
  );

  const Component = isMobile ? MobileApp : DesktopApp;

  if (!current)
    return (
      <Component
        mobileRef={mobileRef}
        View={() => null}
        Navigation={Navigation}
      />
    );

  return (
    <Component
      mobileRef={mobileRef}
      View={FinalView}
      Navigation={Navigation}
      {...rest}
    />
  );
}

export function useNavContext() {
  return useContext(NavContext);
}

export function useNavigate() {
  return useNavContext().go;
}

export function useParams() {
  return useNavContext().params;
}
