
import React from "react";

// import {
//   ProviderContext,
//   // SnackbarMessage,
//   // VariantType,
//   OptionsObject
// } from "notistack";

export interface SnackbarProps {
  message: string;
  closable: boolean;
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
  closeButtonText: string;
  severity: string;
}

export interface InnerSnackbarUtilsConfiguratorProps {
  setUseSnackbarRef: (_context: React.Context<any>) => void;
}
