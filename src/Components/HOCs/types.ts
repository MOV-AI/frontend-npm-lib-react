import { ThemeProvider } from "@material-ui/styles";
import { PermissionType } from "@mov-ai/mov-fe-lib-core/models";

export interface WithDefaultsProps {
  name: string;
  component: React.ComponentType;
  offlineValidation: boolean;
  theme: { provider: typeof ThemeProvider; props?: any };
  translations: object;
}
