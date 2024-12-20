import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Paper, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Toggle from "./Toggle";

export default function Menu(props) {
  const { data, types, view } = props;

  const typeMap = {
    string: {
      render: ([key, , value]) => <div key={key}>{value}</div>,
    },
    modal: {
      render: ([key, entry]) => (
        <Button key={key} onClick={() => entry.onClick(entry.ref)}>
          {entry.title}
        </Button>
      ),
      menuRender: ([key, entry]) => (
        <MenuItem key={key} onClick={() => entry.onClick(entry.ref)}>
          {entry.title}
        </MenuItem>
      ),
    },
    bool: {
      render: ([key, entry, value]) => (
        <div key={key}>
          <span>{entry.title}</span>
          <Toggle onToggle={entry.onClick} toggle={value} />
        </div>
      ),
    },
    button: {
      render: ([key, entry]) => (
        <Button key={key} onClick={entry.onClick}>
          {entry.title}
        </Button>
      ),
      menuRender: ([key, entry]) => (
        <MenuItem key={key} onClick={entry.onClick}>
          {entry.title}
        </MenuItem>
      ),
    },
  };

  const entries = Object.entries(types)
    .filter((entry) => !entry[1].hidden)
    .map(([key, entry]) => [
      key,
      {
        ...entry,
        ref: entry.type === "modal" ? useRef(null) : null,
      },
    ]);

  const modalEntries = entries
    .filter((entry) => entry[1].type === "modal")
    .map((entry) => {
      const Modal = entry[1].Modal;
      return <Modal ref={entry[1].ref} key={entry[0] + "-modal"} />;
    });

  if (view) {
    return (
      <div className="pad vertical overflow-hidden">
        <Paper className="child pad-children-smallest menu">
          {entries.map(([key, entry]) =>
            typeMap[entry.type].render([key, entry, data[key]]),
          )}
        </Paper>
        {modalEntries}
      </div>
    );
  } else
    return (
      <>
        {entries.map(([key, entry]) =>
          (typeMap[entry.type].renderMenu || typeMap[entry.type].render)([
            key,
            entry,
            data[key],
          ]),
        )}
        {modalEntries}
      </>
    );
}

Menu.propTypes = {
  types: PropTypes.object,
  data: PropTypes.object,
  view: PropTypes.bool,
};
