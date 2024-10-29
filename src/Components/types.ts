import { MouseEventHandler } from "react";

export interface ToggleProps {
  toggle: boolean;
  onToggle: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => void;
  label?: string;
  color?: "primary" | "secondary" | "default";
  disabled?: boolean;
  hidden?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  size?: "small" | "medium";
  style?: object;
}

export interface BreadcrumbProps {
  style: React.CSSProperties;
  pathList: { function: MouseEventHandler; label: string }[];
}
