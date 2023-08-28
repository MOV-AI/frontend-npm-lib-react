export default FiltersIcon;
declare function FiltersIcon(props: any): React.JSX.Element;
declare namespace FiltersIcon {
    namespace propTypes {
        const isActive: PropTypes.Requireable<boolean>;
        const disabled: PropTypes.Requireable<boolean>;
        const tooltip: PropTypes.Requireable<string>;
        const title: PropTypes.Requireable<string>;
        const icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
    }
    namespace defaultProps {
        const isActive_1: boolean;
        export { isActive_1 as isActive };
        const disabled_1: boolean;
        export { disabled_1 as disabled };
        const tooltip_1: string;
        export { tooltip_1 as tooltip };
        const title_1: string;
        export { title_1 as title };
        const icon_1: React.JSX.Element;
        export { icon_1 as icon };
    }
}
import React from "react";
import PropTypes from "prop-types";
