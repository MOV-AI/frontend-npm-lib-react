import React from "react";
import { PermissionType } from "@mov-ai/mov-fe-lib-core";
interface LoginSub {
    loggedIn: boolean;
    currentUser: any;
    loading: boolean;
    clean: boolean;
    providers: string[];
}
export declare const loggedOutInfo: {
    loggedIn: boolean;
    currentUser: null;
    loading: boolean;
    clean: boolean;
    providers: never[];
};
export declare const authSub: import("@mov-ai/mov-fe-lib-core/types/api/Utils/Sub").Sub<LoginSub>;
export declare const authEmit: (...args: any[]) => Promise<LoginSub>;
export default function withAuthentication(WrappedComponent: React.ComponentType, appName: PermissionType | string, allowGuest?: boolean): (props: any) => React.JSX.Element;
export {};
