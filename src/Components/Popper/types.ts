import { PopperPlacementType } from "@mui/material";

export interface HTMLPopperProps {
  clickableElement: JSX.Element;
  children?: JSX.Element;
  hideOnClickAway?: boolean;
  popperPlacement?: PopperPlacementType;
}
