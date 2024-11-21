import React, { useCallback, useMemo } from "react";
import { Input, Select, FormControl } from "@material-ui/core";
import { useSelectBoxStyle } from "../styles";
import { getSelector } from "../utils/Utils";

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
  filters,
  setFilters,
  labelMap,
  label,
  menuProps,
  useStyles = useSelectBoxStyle,
) {
  const { [label]: map } = filters;
  const selector = useMemo(() => getSelector(labelMap, map), [map]);
  const classes = useStyles();
  const set = useCallback(
    (value) =>
      setFilters((oldFilters) => ({
        ...oldFilters,
        [label]: value,
      })),
    [label, setFilters],
  );
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
