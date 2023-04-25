import React, { MouseEventHandler } from "react";

export interface AbstractModalProps {
  onSubmit: Function;
  onCancel: MouseEventHandler;
  onKeyPress?: Function;
  open: boolean;
  title: string;
  submitText: string;
  submitColor: any;
  cancelText: string;
  cancelColor: any;
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
  submitColor: any;
  cancelText: string;
  cancelColor: any;
  children: React.ReactNode;
  message: string;
}
