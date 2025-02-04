import React, { useMemo, useCallback } from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResetSearch from "@mui/icons-material/Close";
import { useSearchInputStyles } from "../../styles";
import i18n from "i18next";

const SearchInput = (props) => {
  const { filters, setFilters } = props;
  const { message } = filters;
  const classes = useSearchInputStyles();

  const onChangeText = useCallback(
    (message) => {
      setFilters((oldFilters) => ({
        ...oldFilters,
        message,
      }));
    },
    [setFilters],
  );

  const startAdornment = useMemo(
    () => (
      <InputAdornment className={classes.iconAdornment} position="start">
        <SearchIcon data-testid="output_icon" fontSize="small" />
      </InputAdornment>
    ),
    [classes],
  );

  const endAdornment = useMemo(
    () => (
      <InputAdornment position="end">
        <IconButton
          data-testid="output_button"
          disabled={!message}
          onClick={() => onChangeText({ target: { value: "" } })}
        >
          <ResetSearch color="inherit" fontSize="small" />
        </IconButton>
      </InputAdornment>
    ),
    [message, onChangeText],
  );

  return (
    <TextField
      placeholder={i18n.t("Search")}
      defaultValue={message}
      onChange={(event) => onChangeText(event.target.value)}
      InputProps={
        ({ "data-testid": "output_search" }, { startAdornment, endAdornment })
      }
      size="small"
    />
  );
};

export default SearchInput;
