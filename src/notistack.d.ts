import 'notistack';

declare module 'notistack' {
  export interface SharedProps {
    // your fixed or overridden type declarations
    // ...
  }

  export interface ProviderContext {
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    closeSnackbar: (key?: SnackbarKey) => void;
    // You can extend this with more methods/properties if required
  }

  export const SnackbarProvider: React.ComponentType<any>;

  export interface OptionsObject {
    [key: string]: any; // generic key-value store
  }

  export type SnackbarKey = string | number;  // Assuming it can be string or number

  export function useSnackbar(): ProviderContext;

  export type VariantType = "default" | "error" | "success" | "warning" | "info";

  export type SnackbarMessage = string | React.ReactNode;  // A message can be a string or a React component

  interface SharedProps {
    content?: SnackbarMessage | null;
    // Any other properties you want to adjust...
  }
}
