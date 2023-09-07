export default Select;
declare function Select(props: any): React.JSX.Element;
declare namespace Select {
    namespace propTypes {
        const value: PropTypes.Requireable<string>;
        const options: PropTypes.Requireable<any[]>;
        const noneOption: PropTypes.Requireable<boolean>;
        const noneOptionConfig: PropTypes.Requireable<{
            [x: string]: any;
        }>;
        const label: PropTypes.Requireable<string>;
        const variant: PropTypes.Requireable<string>;
        const style: PropTypes.Requireable<object>;
        const onChange: PropTypes.Requireable<(...args: any[]) => any>;
        const id: PropTypes.Requireable<string>;
        const inputProps: PropTypes.Requireable<object>;
    }
    namespace defaultProps {
        const value_1: string;
        export { value_1 as value };
        const options_1: never[];
        export { options_1 as options };
        const variant_1: string;
        export { variant_1 as variant };
        const noneOption_1: boolean;
        export { noneOption_1 as noneOption };
        export namespace noneOptionConfig_1 {
            const value_2: string;
            export { value_2 as value };
            export const text: string;
        }
        export { noneOptionConfig_1 as noneOptionConfig };
        export function onChange_1(evt: any): void;
        export { onChange_1 as onChange };
        const id_1: string;
        export { id_1 as id };
    }
}
import React from "react";
import PropTypes from "prop-types";
