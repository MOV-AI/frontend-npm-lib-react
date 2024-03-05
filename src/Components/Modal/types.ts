import { PropTypes } from "@mui/material";
import { MouseEventHandler } from "react";

export interface AbstractModalProps {
  onSubmit: Function;
  onCancel: MouseEventHandler;
  onKeyPress?: Function;
  open: boolean;
  title: string;
  submitText: string;
  submitColor: PropTypes.Color;
  cancelText: string;
  cancelColor: PropTypes.Color;
  width?: string;
  height?: string;
  style?: object;
  disableActions?: boolean;
  hasSubmitButton?: boolean;
  hasCancelButton?: boolean;
  children: React.ReactNode;
}

export interface ConfirmModalProps {
  onSubmit: Function;
  onCancel: MouseEventHandler;
  onKeyPress: Function;
  open: boolean;
  title: string;
  submitText: string;
  submitColor: PropTypes.Color;
  cancelText: string;
  cancelColor: PropTypes.Color;
  children: React.ReactNode;
  message: string;
}
