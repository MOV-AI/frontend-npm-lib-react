import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function withDate(
  Component: React.ComponentClass,
) {
  return function (props: any) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Component {...props} />
      </LocalizationProvider>
    );
  };
}

