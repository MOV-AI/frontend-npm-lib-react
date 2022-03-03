import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MaterialSelect from "@material-ui/core/Select";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Select = props => {
  const classes = useStyles();

  let noneOption = <div></div>;
  if (props.noneOption) {
    noneOption = (
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
    );
  }

  return (
    <FormControl
      variant={props.variant}
      className={classes.formControl}
      style={props.style}
      hiddenLabel={props.label === undefined ? true : false}
    >
      <InputLabel id="movai-react-select">{props.label}</InputLabel>
      <MaterialSelect
        labelId="movai-react-select"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        multiple={props.multiple}
        inputProps={props.inputProps}
      >
        {noneOption}
        {props.options.map((element, index) => {
          return (
            <MenuItem key={index} value={element}>
              {element}
            </MenuItem>
          );
        })}
      </MaterialSelect>
    </FormControl>
  );
};

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  noneOption: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  id: PropTypes.string,
  inputProps: PropTypes.object
};
Select.defaultProps = {
  value: "option2",
  options: ["option1", "option2", "option3"],
  variant: "filled",
  noneOption: true,
  onChange: evt => console.log(evt.target.value),
  id: "movai-react-select"
};

export default Select;
