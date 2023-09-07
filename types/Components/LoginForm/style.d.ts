export function styles(theme: any): {
    root: {
        padding: any;
        borderRadius: number;
    };
    container: {
        paddingTop: string;
    };
    logoImage: {
        display: string;
        marginLeft: string;
        marginRight: string;
        width: string;
    };
    formControl: {
        width: string;
    };
};
export function advancedSectionStyles(theme: any): {
    container: {
        flexGrow: number;
    };
    expandCollapseButton: {
        width: string;
        justifyContent: string;
        paddingLeft: string;
        paddingRight: string;
        marginTop: string;
        "&:focus-visible": {
            backgroundColor: string;
        };
    };
    label: {
        fontSize: string;
    };
    providerSelectorInput: {
        display: string;
    };
    grid: {
        justifyContent: string;
    };
    formControl: {
        width: string;
    };
};
