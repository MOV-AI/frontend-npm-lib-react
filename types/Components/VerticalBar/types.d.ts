import { ReactNode } from "react";
export interface VerticalBarProps {
    upperElement: ReactNode;
    creatorElement?: ReactNode;
    navigationList?: Array<ReactNode>;
    lowerElement: ReactNode;
    backgroundColor?: string;
    useDividers?: boolean;
    unsetAccountAreaPadding: boolean;
}
