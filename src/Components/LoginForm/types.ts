import { SelectChangeEvent } from "@mui/material";

export interface LoginFormProps {
  logo?: string;
  domains: string[];
  authErrorMessage: string;
  onChanges?: () => void;
  onLoginSubmit: (submitProps: {
    username: string;
    password: string;
    remember: boolean;
    selectedProvider: string;
  }) => void;
  t: (slationKey: string) => string;
}

export interface LoginFormAdvancedProps {
  domains: string[];
  selectedProvider: string;
  onProviderChange: (event: SelectChangeEvent<string>) => void;
}
