import React, { useCallback, useMemo } from "react";
import { Input, Select, FormControl } from "@mui/material";
import { useSelectBoxStyle } from "../styles";
import { getSelector } from "../utils/Utils";
import { logsSub } from "../sub";

function onChangeSelect(set, prevState, event) {
  const selected = event.target.value.reduce(
    (a, key) => ({ ...a, [key]: true }),
    {},
  );
  set(
    Object.entries(prevState).reduce(
      (a, [key]) => ({
        ...a,
        [key]: !!selected[key],
      }),
      {},
    ),
  );
}

export default function useSelector(
  labelMap,
  label,
  menuProps,
  useStyles = useSelectBoxStyle,
) {
  const { [label]: map } = logsSub.use();
  const selector = useMemo(() => getSelector(labelMap, map), [map]);
  const classes = useStyles();
  const set = useCallback((value) => logsSub.set(label, value), [label]);
  const onChange = useCallback(
    (event) => onChangeSelect(set, map, event),
    [set, map],
  );

  return (
    <div data-testid={`section_${label}`}>
      <FormControl className={classes.formControl}>
        <Select
          inputProps={{ "data-testid": "input_select" }}
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selector.selected}
          onChange={onChange}
          input={<Input />}
          renderValue={selector.renderValue}
          MenuProps={menuProps}
        >
          {selector.menu}
        </Select>
      </FormControl>
    </div>
  );
}
