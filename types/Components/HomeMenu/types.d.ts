export interface App {
    Enabled: boolean;
    Icon: string;
    Label: string;
    Type: string;
    URL: string;
}
export interface MenuAppProps {
    app: App;
}
