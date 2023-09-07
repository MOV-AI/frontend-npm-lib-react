export function styles(): {
    root: {
        backgroundColor: string;
        display: string;
        padding: string;
    };
    filledSuccess: {
        color: string;
        backgroundColor: string;
    };
    filledInfo: {
        color: string;
        backgroundColor: string;
    };
    filledWarning: {
        color: string;
        backgroundColor: string;
    };
    filledError: {
        color: string;
        backgroundColor: string;
    };
    icon: {
        marginRight: number;
        padding: string;
        display: string;
        fontSize: number;
        opacity: number;
    };
    message: {
        padding: string;
        display: string;
        flexDirection: string;
        justifyContent: string;
    };
    action: {
        display: string;
        alignItems: string;
        marginLeft: string;
        paddingLeft: number;
        marginRight: number;
    };
};
declare const _default: React.ComponentType<Pick<PropTypes.InferProps<{
    /**
     * The action to display. It renders after the message, at the end of the alert.
     */
    action: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The content of the component.
     */
    children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.Requireable<object>;
    /**
     * @ignore
     */
    className: PropTypes.Requireable<string>;
    /**
     * Override the default label for the *close popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    closeText: PropTypes.Requireable<string>;
    /**
     * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
     */
    color: PropTypes.Requireable<string>;
    /**
     * Override the icon displayed before the children.
     * Unless provided, the icon is mapped to the value of the `severity` prop.
     */
    icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    /**
     * The component maps the `severity` prop to a range of different icons,
     * for instance success to `<SuccessOutlined>`.
     * If you wish to change this mapping, you can provide your own.
     * Alternatively, you can use the `icon` prop to override the icon displayed.
     */
    iconMapping: PropTypes.Requireable<PropTypes.InferProps<{
        error: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        info: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        success: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        warning: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }>>;
    /**
     * Callback fired when the component requests to be closed.
     * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
     *
     * @param {object} event The event source of the callback.
     */
    onClose: PropTypes.Requireable<(...args: any[]) => any>;
    /**
     * The ARIA role attribute of the element.
     */
    role: PropTypes.Requireable<string>;
    /**
     * The severity of the alert. This defines the color and icon used.
     */
    severity: PropTypes.Requireable<string>;
    /**
     * The variant to use.
     */
    variant: PropTypes.Requireable<string>;
}>, "color" | "icon" | "children" | "className" | "role" | "onClose" | "variant" | "action" | "severity" | "closeText" | "iconMapping"> & import("@material-ui/core/styles").StyledComponentProps<"root" | "icon" | "action" | "message" | "filledSuccess" | "filledInfo" | "filledWarning" | "filledError">>;
export default _default;
import PropTypes from "prop-types";
import * as React from "react";
