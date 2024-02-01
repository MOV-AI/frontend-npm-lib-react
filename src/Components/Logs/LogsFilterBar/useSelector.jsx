import React, { useMemo } from "react";
import {
  Input,
  Select,
  FormControl,
} from "@material-ui/core";
import { useSelectBoxStyle } from "../styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MEDIA_QUERY_BREAKPOINT } from "../../../Utils/Constants";
import { getSelector } from "../utils/Utils";

export default
function useSelector(labelMap, label, menuProps, map, handleChange, useStyles = useSelectBoxStyle) {
  const selector = useMemo(() => getSelector(labelMap, map), [map]);
  const classes = useStyles();
  const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

  return (
    <div
      data-testid={`section_${label}`}
      className={
        bigScreen ? classes.toggleContainer : classes.smallToggleContainer
      }
    >
      <FormControl className={classes.formControl}>
        <Select
          inputProps={{ "data-testid": "input_select" }}
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          className={bigScreen ? classes.selectBox : classes.smallSelectBox}
          multiple
          value={selector.selected}
          onChange={handleChange}
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
