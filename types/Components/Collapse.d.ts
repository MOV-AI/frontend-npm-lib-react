export default Collapse;
declare function Collapse(props: any): React.JSX.Element;
declare namespace Collapse {
    namespace propTypes {
        const item: PropTypes.Requireable<object>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
        const open: PropTypes.Requireable<boolean>;
        const divided: PropTypes.Requireable<boolean>;
        const iconStyle: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const item_1: React.JSX.Element;
        export { item_1 as item };
        export { EMPTY_FUNCTION as onClick };
        const open_1: boolean;
        export { open_1 as open };
        const divided_1: boolean;
        export { divided_1 as divided };
        export const style: {};
        const iconStyle_1: {};
        export { iconStyle_1 as iconStyle };
    }
}
import React from "react";
import PropTypes from "prop-types";
import { EMPTY_FUNCTION } from "../Utils/Constants";
