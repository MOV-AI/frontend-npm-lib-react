import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MaterialSelect from "@material-ui/core/Select";
import PropTypes from "prop-types";
import { Checkbox, ListItemText } from "@material-ui/core";

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
      <MenuItem value={props.noneOptionConfig.value}>
        <em>{props.noneOptionConfig.text}</em>
      </MenuItem>
    );
  }

  return (
    <FormControl
      data-testid="section_select-wrapper"
      variant={props.variant}
      className={classes.formControl}
      style={props.style}
      hiddenLabel={props.label === undefined ? true : false}
    >
      <InputLabel data-testid="input_label" id="movai-react-select">
        {props.label}
      </InputLabel>
      <MaterialSelect
        data-testid="section_select"
        labelId="movai-react-select"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        inputProps={props.inputProps}
        multiple={props.multiple}
        renderValue={props.renderValue}
      >
        {noneOption}
        {props.options.map((element, index) => {
          return (
            <MenuItem
              data-testid="output_menu-item"
              key={index}
              value={element}
            >
              {props.multiple && (
                <Checkbox
                  data-testid="output_checkbox"
                  checked={props.value.indexOf(element) > -1}
                />
              )}
              <ListItemText primary={element} />
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
  noneOptionConfig: PropTypes.objectOf({
    value: PropTypes.string,
    text: PropTypes.text
  }),
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
  noneOptionConfig: {
    value: "",
    text: "None"
  },
  onChange: evt => console.log(evt.target.value),
  id: "movai-react-select"
};

export default Select;
