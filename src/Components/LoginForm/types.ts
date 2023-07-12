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
  t: (translationKey: string) => string;
}

export interface LoginFormAdvancedProps {
  domains: string[];
  selectedProvider: string;
  onProviderChange: (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void;
}
