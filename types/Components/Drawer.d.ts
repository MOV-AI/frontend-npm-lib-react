export default Drawer;
declare function Drawer(props: any): React.JSX.Element;
declare namespace Drawer {
    namespace propTypes {
        const style: PropTypes.Requireable<object>;
        const anchor: PropTypes.Requireable<string>;
        const open: PropTypes.Requireable<boolean>;
        const children: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const style_1: {};
        export { style_1 as style };
        const anchor_1: string;
        export { anchor_1 as anchor };
        const open_1: boolean;
        export { open_1 as open };
        const children_1: React.JSX.Element;
        export { children_1 as children };
    }
    namespace ANCHOR {
        const left: string;
        const right: string;
        const top: string;
        const bottom: string;
    }
}
import React from "react";
import PropTypes from "prop-types";
