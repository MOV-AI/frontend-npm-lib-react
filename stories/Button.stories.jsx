import React from "react";
import Button from "../src/Components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    label: {
      description: "overwritten description",
      control: {
        type: null
      }
    },
    disabled: {
      description: "disables the button",
      control: {
        type: "boolean"
      }
    },
    variant: {
      description: "outline of the button, can be contained, outlined",
      control: {
        type: "select",
        options: ["text", "outlined", "contained"]
      }
    },
    color: {
      description: "color of the button, can be default, primary, secondary",
      control: {
        type: "select",
        options: ["default", "inherit", "primary", "secondary"]
      }
    }
  }
};

export const button = args => <Button {...args}>Simple</Button>;

button.story = {
  name: "simple button"
};
