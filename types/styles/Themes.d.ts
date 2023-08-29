export function defaultGetTheme(themeName: any): any;
export function useTheme(): any;
export function withTheme(Component: any): (props: any) => React.JSX.Element;
export function defaultGetStyle(theme: any, themeName: any): {
    "?body": {
        background: any;
    };
};
export const created: {};
export default themes;
import React from "react";
declare namespace themes {
    const dark: {
        label: string;
        textColor: string;
        backgroundColor: string;
        bottomNavigation: {
            background: string;
        };
        globalStats: {
            borderColor: string;
            subTextColor: string;
            upperTextColor: string;
        };
        palette: {
            baked: {
                gray: {
                    dark: string;
                };
            };
            colorOct: {
                func: (x: any) => string[];
                length: number;
            }[];
            type: string;
            primary: {
                main: string;
                light: string;
                dark: string;
                contrastText: string;
            };
            secondary: {
                main: string;
                light: string;
                dark: string;
                contrastText: string;
            };
            green: {
                main: string;
            };
            background: {
                default: string;
                paper: string;
                primary: string;
                secondary: string;
            };
            accent: {
                background: string;
                color: string;
                border: string;
            };
            text: {
                primary: string;
                secondary: string;
                disabled: string;
            };
            getContrastText: () => string;
            common: {
                white: string;
                black: string;
            };
            success: import("@tty-pt/styles/src/types").Color;
            warning: import("@tty-pt/styles/src/types").Color;
            error: import("@tty-pt/styles/src/types").Color;
            info: import("@tty-pt/styles/src/types").Color;
            divider: string;
            action: {
                hoverOpacity: string;
                active: string;
            };
            grey: string[];
        };
        icon: {
            color: string;
            hoverColor: string;
        };
        table: {
            stripColor: string;
        };
        verticalBar: {
            iconColor: string;
        };
        overrides: {
            MuiTableCell: {
                body: {
                    color: string;
                };
            };
            MuiAppBar: {
                colorDefault: {
                    color: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                colorInherit: {
                    color: string;
                    backgroundColor: string;
                };
            };
            MuiButton: {
                outlined: {
                    margin: string;
                };
                text: {
                    margin: string;
                };
                contained: {
                    margin: string;
                };
                containedPrimary: {
                    color: string;
                    margin: string;
                };
                containedSecondary: {
                    color: string;
                    margin: string;
                };
            };
            MuiButtonGroup: {
                root: {
                    margin: string;
                };
                groupedContainedPrimary: {
                    margin: string;
                };
                groupedOutlined: {
                    margin: string;
                };
                groupedText: {
                    margin: string;
                };
            };
            MuiIconButton: {
                root: {
                    color: string;
                };
            };
            MuiListItem: {
                button: {
                    "&:hover": {
                        backgroundColor: string;
                    };
                };
            };
            MuiFormControlLabel: {
                label: {
                    color: string;
                };
            };
            MuiInputBase: {
                input: {
                    font: string;
                };
            };
            MuiFilledInput: {
                root: {
                    border: string;
                };
                underline: {
                    "&::before": {
                        borderRadius: string;
                    };
                };
            };
        };
        spacing: typeof spacing;
        spacingOct: import("@tty-pt/styles/src/types").OptOctave<string>[];
        typography: {
            htmlFontSize: number;
            fontFamily: string;
            fontSizeOct: import("@tty-pt/styles/src/types").OptOctave<string>[];
            h1: import("@tty-pt/styles/src/types").Css;
            h2: import("@tty-pt/styles/src/types").Css;
            h3: import("@tty-pt/styles/src/types").Css;
            h4: import("@tty-pt/styles/src/types").Css;
            h5: import("@tty-pt/styles/src/types").Css;
            h6: import("@tty-pt/styles/src/types").Css;
            subtitle2: import("@tty-pt/styles/src/types").Css;
            caption: import("@tty-pt/styles/src/types").Css;
            pxToRem: (arg: any) => any;
        };
        breakpoints?: {
            keys: [];
            up: (name: string) => string;
        } | undefined;
        shadows?: [] | undefined;
        transitions?: {
            create: () => void;
            duration: {
                shorter: string;
            };
            easing: {
                easeOut: string;
            };
        } | undefined;
        shape?: {
            borderRadius: string;
        } | undefined;
        zIndex?: {
            tooltip: number;
        } | undefined;
    };
    const light: {
        font: {
            Roboto: {
                fontFamily: string;
            };
            OpenSans: {
                fontFamily: string;
            };
        };
        label: string;
        textColor: string;
        backgroundColor: string;
        bottomNavigation: {
            background: string;
        };
        icon: {
            color: string;
            hoverColor: string;
        };
        table: {
            stripColor: string;
        };
        globalStats: {
            borderColor: string;
            subTextColor: string;
            upperTextColor: string;
        };
        palette: {
            baked: {
                gray: {
                    dark: string;
                };
            };
            colorOct: {
                func: (x: any) => string[];
                length: number;
            }[];
            primary: {
                main: string;
                light: string;
                dark: string;
                contrastText: string;
            };
            secondary: {
                main: string;
                light: string;
                dark: string;
                contrastText: string;
            };
            green: {
                main: string;
            };
            background: {
                default: string;
                paper: string;
                primary: string;
                secondary: string;
                overlay: string;
            };
            accent: {
                background: string;
                color: string;
                border: string;
            };
            text: {
                primary: string;
                secondary: string;
                disabled: string;
            };
            getContrastText: () => string;
            common: {
                white: string;
                black: string;
            };
            type: string;
            success: import("@tty-pt/styles/src/types").Color;
            warning: import("@tty-pt/styles/src/types").Color;
            error: import("@tty-pt/styles/src/types").Color;
            info: import("@tty-pt/styles/src/types").Color;
            divider: string;
            action: {
                hoverOpacity: string;
                active: string;
            };
            grey: string[];
        };
        verticalBar: {
            iconColor: string;
        };
        overrides: {
            MuiTableCell: {
                body: {
                    color: string;
                };
            };
            MuiAppBar: {
                colorDefault: {
                    color: string;
                    borderColor: string;
                    backgroundColor: string;
                };
                colorInherit: {
                    color: string;
                    backgroundColor: string;
                };
            };
            MuiButton: {
                outlined: {
                    margin: string;
                };
                text: {
                    margin: string;
                };
                contained: {
                    margin: string;
                };
                containedPrimary: {
                    color: string;
                    margin: string;
                };
                containedSecondary: {
                    color: string;
                    margin: string;
                };
            };
            MuiButtonGroup: {
                root: {
                    margin: string;
                };
                groupedContainedPrimary: {
                    margin: string;
                };
                groupedOutlined: {
                    margin: string;
                };
                groupedText: {
                    margin: string;
                };
            };
            MuiIconButton: {
                root: {
                    color: string;
                };
            };
            MuiListItem: {
                button: {
                    "&:hover": {
                        backgroundColor: string;
                    };
                };
            };
            MuiFormControlLabel: {
                label: {
                    color: string;
                };
            };
            MuiInputBase: {
                input: {
                    font: string;
                };
            };
            MuiFilledInput: {
                root: {
                    border: string;
                };
                underline: {
                    "&::before": {
                        borderRadius: string;
                    };
                };
            };
            MuiPaper: {
                root: {
                    color: string;
                    backgroundColor: string;
                };
            };
            MuiTableRow: {
                head: {
                    "& th": {
                        backgroundColor: string;
                        borderBottom: string;
                    };
                };
                root: {
                    "& td": {
                        borderBottom: string;
                    };
                };
            };
        };
        spacing: typeof spacing;
        spacingOct: import("@tty-pt/styles/src/types").OptOctave<string>[];
        typography: {
            htmlFontSize: number;
            fontFamily: string;
            fontSizeOct: import("@tty-pt/styles/src/types").OptOctave<string>[];
            h1: import("@tty-pt/styles/src/types").Css;
            h2: import("@tty-pt/styles/src/types").Css;
            h3: import("@tty-pt/styles/src/types").Css;
            h4: import("@tty-pt/styles/src/types").Css;
            h5: import("@tty-pt/styles/src/types").Css;
            h6: import("@tty-pt/styles/src/types").Css;
            subtitle2: import("@tty-pt/styles/src/types").Css;
            caption: import("@tty-pt/styles/src/types").Css;
            pxToRem: (arg: any) => any;
        };
        breakpoints?: {
            keys: [];
            up: (name: string) => string;
        } | undefined;
        shadows?: [] | undefined;
        transitions?: {
            create: () => void;
            duration: {
                shorter: string;
            };
            easing: {
                easeOut: string;
            };
        } | undefined;
        shape?: {
            borderRadius: string;
        } | undefined;
        zIndex?: {
            tooltip: number;
        } | undefined;
    };
}
declare function spacing(a: any): string;
