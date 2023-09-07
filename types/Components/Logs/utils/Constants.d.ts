export const SIMPLE_LEVELS_LIST: {
    value: string;
    label: string;
}[];
export const ADVANCED_LEVELS_LIST: {
    value: string;
    label: string;
}[];
export namespace ROBOT_STATES {
    const ERROR: string;
    const ACTIVE: string;
    const OFFLINE: string;
}
export namespace COLUMN_LIST {
    namespace Date {
        const label: string;
        const dataKey: string;
        const width: number;
        function render(time: any): string;
    }
    namespace Time {
        const label_1: string;
        export { label_1 as label };
        const dataKey_1: string;
        export { dataKey_1 as dataKey };
        const width_1: number;
        export { width_1 as width };
        export function render_1(time: any): string;
        export { render_1 as render };
    }
    namespace Level {
        const label_2: string;
        export { label_2 as label };
        const dataKey_2: string;
        export { dataKey_2 as dataKey };
        const width_2: number;
        export { width_2 as width };
    }
    namespace Module {
        const label_3: string;
        export { label_3 as label };
        const dataKey_3: string;
        export { dataKey_3 as dataKey };
        const width_3: number;
        export { width_3 as width };
    }
    namespace Robot {
        const label_4: string;
        export { label_4 as label };
        const dataKey_4: string;
        export { dataKey_4 as dataKey };
        const width_4: number;
        export { width_4 as width };
    }
    namespace Message {
        const label_5: string;
        export { label_5 as label };
        const dataKey_5: string;
        export { dataKey_5 as dataKey };
        const width_5: number;
        export { width_5 as width };
    }
}
export const DEFAULT_SELECTED_SERVICES: string[];
export const DEFAULT_SELECTED_LEVELS: string[];
export const DEFAULT_SELECTED_COLUMNS: string[];
export const DEFAULT_LIMIT: 50;
export const ROBOT_LOG_TYPE: string[];
export namespace DATE_KEY_OPTION {
    const FROM: string;
    const TO: string;
}
export namespace COLOR_CODING {
    export namespace INFO {
        const backgroundColor: string;
    }
    export namespace WARNING {
        const backgroundColor_1: string;
        export { backgroundColor_1 as backgroundColor };
    }
    export namespace DEBUG {
        const backgroundColor_2: string;
        export { backgroundColor_2 as backgroundColor };
    }
    export namespace ERROR_1 {
        const backgroundColor_3: string;
        export { backgroundColor_3 as backgroundColor };
    }
    export { ERROR_1 as ERROR };
    export namespace CRITICAL {
        const backgroundColor_4: string;
        export { backgroundColor_4 as backgroundColor };
    }
}
