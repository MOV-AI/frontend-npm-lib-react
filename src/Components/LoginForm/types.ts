export interface LoginFormProps {
  appName?: string;
  classes: {
    [cssClass: string]: any;
  };
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
  classes?: { [className: string]: string };
  domains: string[];
  selectedProvider: string;
  onProviderChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    child: React.ReactNode,
  ) => void;
}
