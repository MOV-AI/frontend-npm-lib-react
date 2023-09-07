declare const _default: React.ComponentType<Pick<Pick<PropTypes.InferProps<{
    data: PropTypes.Requireable<any[]>;
    onClickNode: PropTypes.Requireable<(...args: any[]) => any>;
    onDoubleClickNode: PropTypes.Requireable<(...args: any[]) => any>;
    handleChange: PropTypes.Requireable<(...args: any[]) => any>;
    height: PropTypes.Requireable<NonNullable<string | number | null | undefined>>;
}>, never> & {
    height?: NonNullable<string | number | null | undefined> | null | undefined;
    data?: any[] | null | undefined;
    onClickNode?: ((...args: any[]) => any) | null | undefined;
    onDoubleClickNode?: ((...args: any[]) => any) | null | undefined;
    handleChange?: ((...args: any[]) => any) | null | undefined;
} & {}, "height" | "data" | "onClickNode" | "onDoubleClickNode" | "handleChange"> & import("@material-ui/core/styles").StyledComponentProps<"ellipsis" | "spaceBetween" | "horizFlex" | "preContainer" | "iconSpace">>;
export default _default;
import PropTypes from "prop-types";
import React from "react";
