export default ContextMenu;
declare function ContextMenu(props: any): React.JSX.Element;
declare namespace ContextMenu {
    namespace propTypes {
        const element: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const navigationList: PropTypes.Requireable<any[]>;
        const lowerElement: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const width: PropTypes.Requireable<string>;
        const backgroundColor: PropTypes.Requireable<string>;
        const styledMenuProps: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const element_1: React.JSX.Element;
        export { element_1 as element };
        export const menuList: {
            onClick: () => void;
            element: string;
            onClose: boolean;
        }[];
        const lowerElement_1: React.JSX.Element;
        export { lowerElement_1 as lowerElement };
        const width_1: string;
        export { width_1 as width };
        const backgroundColor_1: string;
        export { backgroundColor_1 as backgroundColor };
        export const style: {};
        const styledMenuProps_1: {};
        export { styledMenuProps_1 as styledMenuProps };
    }
}
import React from "react";
import PropTypes from "prop-types";
