import React from "react";
import Select from "../src/Components/Select";

export default {
  title: "Select",
  argTypes: {
    multiple: {
      control: "boolean",
    },
  },
};

const NONE_OPTION_VALUE = "";
const ALL_ROLES = {
  DefaultRole: { Label: "DefaultRole" },
  admin: { Label: "admin" },
  operator: { Label: "operator" },
};

const Template = (props) => {
  const { multiple } = props;
  const [emptyValue, setEmptyValue] = React.useState(multiple ? [] : "");
  const [selectedRoles, setSelectedRoles] = React.useState(emptyValue);
  const [selectorProps, setSelectorProps] = React.useState({});

  React.useEffect(() => {
    if (multiple) {
      setSelectorProps({ renderValue: (selected) => selected.join(", ") });
      setEmptyValue([]);
      setSelectedRoles([]);
    } else {
      setSelectorProps({});
      setEmptyValue("");
      setSelectedRoles("");
    }
  }, [multiple]);

  const handleRolesChange = (evt) => {
    let newSelectedRoles = evt.target.value;
    if (multiple && newSelectedRoles.includes(NONE_OPTION_VALUE))
      newSelectedRoles = emptyValue;
    setSelectedRoles(newSelectedRoles);
  };

  const getValue = () => {
    if (multiple && typeof selectedRoles !== "object") return [];
    else return selectedRoles;
  };

  return (
    <Select
      label={"Role"}
      value={getValue()}
      multiple={multiple}
      onChange={handleRolesChange}
      options={Object.keys(ALL_ROLES)}
      noneOptionConfig={{ value: NONE_OPTION_VALUE, text: "None" }}
      {...selectorProps}
    ></Select>
  );
};

export const Selector = Template.bind({});

Selector.args = {
  multiple: true,
};
