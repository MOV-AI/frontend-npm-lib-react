import { ChangeEvent } from "react";

export interface LoginFormProps {
  appName?: string;
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
}

export interface LoginFormAdvancedProps {
  domains: string[];
  selectedProvider: string;
  onProviderChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
