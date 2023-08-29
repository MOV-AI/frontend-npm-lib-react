export default Button;
declare function Button(props: any): React.JSX.Element;
declare namespace Button {
    namespace propTypes {
        const style: PropTypes.Requireable<object>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const color: PropTypes.Requireable<string>;
        const variant: PropTypes.Validator<string>;
        const size: PropTypes.Requireable<string>;
        const startIcon: PropTypes.Requireable<PropTypes.ReactElementLike>;
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const disabled: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const style_1: {};
        export { style_1 as style };
        export function onClick_1(): void;
        export { onClick_1 as onClick };
        const color_1: string;
        export { color_1 as color };
        const variant_1: string;
        export { variant_1 as variant };
        const size_1: string;
        export { size_1 as size };
        const startIcon_1: undefined;
        export { startIcon_1 as startIcon };
        const children_1: React.JSX.Element;
        export { children_1 as children };
        const disabled_1: boolean;
        export { disabled_1 as disabled };
    }
}
import React from "react";
import PropTypes from "prop-types";
