import { PopperPlacementType } from "@material-ui/core";

export interface HTMLPopperProps {
  clickableElement: JSX.Element;
  children?: JSX.Element;
  hideOnClickAway?: boolean;
  popperPlacement?: PopperPlacementType;
}
