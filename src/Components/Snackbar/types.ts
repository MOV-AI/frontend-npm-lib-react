import {
  ProviderContext,
  SnackbarMessage,
  VariantType,
  OptionsObject
} from "notistack";

export interface SnackbarProps extends OptionsObject {
  message: SnackbarMessage;
  closable: boolean;
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
  closeButtonText: string;
  severity: VariantType;
}

export interface InnerSnackbarUtilsConfiguratorProps {
  setUseSnackbarRef: (_context: ProviderContext) => void;
}
