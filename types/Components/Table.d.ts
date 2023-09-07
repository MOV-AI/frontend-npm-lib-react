export default Table;
declare function Table(props: any): React.JSX.Element;
declare namespace Table {
    namespace propTypes {
        const style: PropTypes.Requireable<object>;
        const title: PropTypes.Requireable<string>;
        const columns: PropTypes.Requireable<any[]>;
        const data: PropTypes.Requireable<any[]>;
        const actions: PropTypes.Requireable<any[]>;
        const options: PropTypes.Requireable<object>;
        const components: PropTypes.Requireable<object>;
        const localization: PropTypes.Requireable<object>;
        const icons: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const style_1: {};
        export { style_1 as style };
        const title_1: string;
        export { title_1 as title };
        const columns_1: never[];
        export { columns_1 as columns };
        const data_1: never[];
        export { data_1 as data };
        const actions_1: never[];
        export { actions_1 as actions };
        const icons_1: {};
        export { icons_1 as icons };
        export namespace options_1 {
            const actionsColumnIndex: number;
            const draggable: boolean;
            const grouping: boolean;
            const search: boolean;
            const toolbar: boolean;
            const searchFieldAlignment: string;
            const paging: boolean;
        }
        export { options_1 as options };
        const components_1: {};
        export { components_1 as components };
    }
}
import React from "react";
import PropTypes from "prop-types";
