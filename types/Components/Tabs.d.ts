declare function Tabs(props: any): React.JSX.Element;
declare namespace Tabs {
    namespace propTypes {
        const tabList: PropTypes.Requireable<any[]>;
        const selectedTab: PropTypes.Requireable<number>;
        const scrollable: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const tabList_1: {
            label: string;
            component: React.JSX.Element;
        }[];
        export { tabList_1 as tabList };
        const selectedTab_1: number;
        export { selectedTab_1 as selectedTab };
        const scrollable_1: boolean;
        export { scrollable_1 as scrollable };
    }
}
export default Tabs;
import React from "react";
import PropTypes from "prop-types";
