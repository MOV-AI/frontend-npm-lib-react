declare function LogsTable(props: any): React.JSX.Element;
declare namespace LogsTable {
    namespace propTypes {
        const columns: PropTypes.Requireable<any[]>;
        const logsData: PropTypes.Requireable<any[]>;
        const height: PropTypes.Requireable<number>;
        const onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const columns_1: never[];
        export { columns_1 as columns };
        const logsData_1: never[];
        export { logsData_1 as logsData };
        const height_1: number;
        export { height_1 as height };
    }
}
export default LogsTable;
import React from "react";
import PropTypes from "prop-types";
