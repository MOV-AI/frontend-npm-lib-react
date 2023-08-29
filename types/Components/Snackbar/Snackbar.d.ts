import React from "react";
import { OptionsObject, ProviderContext, VariantType } from "notistack";
import "./Snackbar.style.css";
export interface SnackbarProps extends OptionsObject {
    message: string;
    closable: boolean;
    horizontal: "left" | "center" | "right";
    vertical: "bottom" | "top";
    closeButtonText: string;
    severity: VariantType;
    content: any;
}
export interface InnerSnackbarUtilsConfiguratorProps {
    setUseSnackbarRef: Function;
}
export declare const SnackbarUtilsConfigurator: () => React.JSX.Element;
export declare const snackbar: (props: SnackbarProps, _theme: any) => ProviderContext | null;
