import React from "react";
interface WithErrorProps {
    children?: any;
    key?: string;
    [key: string]: any;
}
export default function withError(Component: React.ComponentType<WithErrorProps>): React.FC<WithErrorProps>;
export {};
