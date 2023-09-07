export function getAllData(workspace: any, data?: {
    id: number;
    name: string;
    scope: string;
    children: never[];
}[]): Promise<{
    children: any;
    id: number;
    name: string;
    scope: string;
}[]>;
export default SelectScopeModal;
declare function SelectScopeModal(props: any): React.JSX.Element;
declare namespace SelectScopeModal {
    namespace propTypes {
        const allowArchive: PropTypes.Requireable<boolean>;
        const onSubmit: PropTypes.Requireable<(...args: any[]) => any>;
        const onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        const open: PropTypes.Requireable<boolean>;
        const scopeList: PropTypes.Requireable<any[]>;
        const message: PropTypes.Requireable<string>;
        const selected: PropTypes.Requireable<string>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
        const data: PropTypes.Requireable<any[]>;
    }
    namespace defaultProps {
        export const title: string;
        const message_1: string;
        export { message_1 as message };
        const allowArchive_1: boolean;
        export { allowArchive_1 as allowArchive };
        const open_1: boolean;
        export { open_1 as open };
        const scopeList_1: string[];
        export { scopeList_1 as scopeList };
        const selected_1: string;
        export { selected_1 as selected };
    }
}
import React from "react";
import PropTypes from "prop-types";
