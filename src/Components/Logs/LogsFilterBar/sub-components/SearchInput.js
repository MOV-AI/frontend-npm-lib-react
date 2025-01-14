import React, { useMemo, useCallback } from "react";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ResetSearch from "@material-ui/icons/Close";
import { useSearchInputStyles } from "../../styles";
import i18n from "i18next";

const SearchInput = (props) => {
  const { filters, setFilters } = props;
  const { message } = filters;
  const classes = useSearchInputStyles();

  const onChangeText = useCallback(
    (event) => {
      setFilters((oldFilters) => ({
        ...oldFilters,
        message: event.target.value,
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
      value={message}
      onChange={onChangeText}
      InputProps={
        ({ "data-testid": "output_search" }, { startAdornment, endAdornment })
      }
      size="small"
    />
  );
};

export default SearchInput;
