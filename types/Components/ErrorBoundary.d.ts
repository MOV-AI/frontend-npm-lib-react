import React, { Component, ReactNode } from "react";
interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    error: Error | boolean;
    errorInfo: any;
    stackLine: string;
}
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: any);
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): React.ReactNode;
}
export {};
