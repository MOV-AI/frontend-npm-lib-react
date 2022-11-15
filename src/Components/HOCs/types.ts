import { ThemeProvider } from "@material-ui/styles";

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  theme: { provider: typeof ThemeProvider; props?: any };
  translations: object;
}
