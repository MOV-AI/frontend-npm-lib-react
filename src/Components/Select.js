import React from "react";
import { makeStyles } from "@material-ui/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MaterialSelect from "@material-ui/core/Select";
import PropTypes from "prop-types";
import { Checkbox, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1) + " !important",
    minWidth: 120,
  },
  backdrop: {
    "& div[aria-hidden=true]": {
      backgroundColor: "black !important",
      opacity: 0.5,
      visibility: "visible",
    },
  },
}));

const Select = (props) => {
  const {
    variant,
    style,
    label,
    options,
    noneOption,
    noneOptionConfig,
    ...otherProps
  } = props;
  const classes = useStyles();

  let noneOptionEL = <div></div>;
  if (noneOption) {
    noneOptionEL = (
      <MenuItem value={noneOptionConfig.value}>
        <em>{noneOptionConfig.text}</em>
      </MenuItem>
    );
  }

  return (
    <FormControl
      data-testid="section_select-wrapper"
      variant={variant}
      className={classes.formControl}
      style={style}
      hiddenLabel={label === undefined ? true : false}
    >
      <InputLabel data-testid="input_label" id="movai-react-select">
        {label}
      </InputLabel>
      <MaterialSelect
        MenuProps={{ PopoverClasses: { root: classes.backdrop } }}
        data-testid="section_select"
        labelId="movai-react-select"
        {...otherProps}
      >
        {noneOptionEL}
        {options.map((element, index) => {
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
    text: PropTypes.text,
  }),
  label: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  id: PropTypes.string,
  inputProps: PropTypes.object,
};
Select.defaultProps = {
  value: "",
  options: [],
  variant: "filled",
  noneOption: true,
  noneOptionConfig: {
    value: "",
    text: "None",
  },
  onChange: (evt) => console.log(evt.target.value),
  id: "movai-react-select",
};

export default Select;
