import React from "react";
import PropTypes from "prop-types";
import { BreadcrumbProps } from "./types";
declare const Breadcrumb: {
    (props: BreadcrumbProps): React.JSX.Element;
    propTypes: {
        pathList: PropTypes.Requireable<any[]>;
    };
    defaultProps: {
        pathList: ({
            label: string;
            function: () => void;
        } | {
            label: string;
            function?: undefined;
        })[];
    };
};
export default Breadcrumb;
