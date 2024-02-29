import React  from "react";
import {
  Checkbox,
  MenuItem,
  ListItemText
} from "@mui/material";

// Makes sure to find unique "i" of chip array
// Input: [{key: 0, label: "Chip1"}, {key: 2, label: "Chip3"}], keyName= "key"
// Output: 1
export function findsUniqueKey(array, keyName) {
  const length = array.length;
  // If empty, return 0
  if (length === 0 || array === undefined) {
    return 0;
  }
  for (let k = 0; k < length; k++) {
    for (let j = 0; j < length; j++) {
      if (k === array[j][keyName]) {
        break;
      }
      if (j === length - 1) {
        return k;
      }
    }
  }

  return length;
}

// Convert Date format to a human readable format
// Input: 1586370146
// Output: "08/04/2020"
export const getJustDateFromServer = serverTime => {
  const time = new Date(serverTime * 1000);
  return `${time.toLocaleDateString("pt")}`;
};
// Convert Date format to a human readable format
// Input: 1586370146
// Output: "19:22:26"
export const getJustTimeFromServer = serverTime => {
  const time = new Date(serverTime * 1000);
  return `${time.toLocaleTimeString("pt")}`;
};

// both of the above
export function getDateTime(timestamp) {
  const date = getJustDateFromServer(timestamp);
  const time = getJustTimeFromServer(timestamp);
  return [ date, time ];
}

export function getSelector(labelMap, map) {
  const selected = Object.entries(map).filter(([_key, value]) => value).map(([key]) => key);

  return {
    list: Object.keys(map),
    selected,
    menu: Object.keys(map).map(name => (
      <MenuItem key={name} value={name} disabled={map[name] && map[name] !== true}>
        <Checkbox
          inputProps={{ "data-testid": "input_checkbox" }}
          checked={map[name]}
          disabled={map[name] && map[name] !== true}
        />
        <ListItemText data-testid="output_label" primary={labelMap[name]} />
      </MenuItem>
    )),
    renderValue: () => selected.map(name => labelMap[name]).join(", "),
  };
}
