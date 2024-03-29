import React, { useMemo, useCallback } from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ResetSearch from "@mui/icons-material/Close";
import { useSearchInputStyles } from "../../styles";
import { logsSub } from "./../../sub";
import i18n from "i18next";

const SearchInput = () => {
  const { message } = logsSub.use();
  const classes = useSearchInputStyles();

  const onChangeText = useCallback(event => {
    logsSub.set("message", event.target.value);
  }, []);

  const startAdornment = useMemo(() => (
    <InputAdornment className={classes.iconAdornment} position="start">
      <SearchIcon data-testid="output_icon" fontSize="small" />
    </InputAdornment>
  ), [classes]);

  const endAdornment = useMemo(() => (
    <InputAdornment position="end">
      <IconButton
        data-testid="output_button"
        disabled={!message}
        onClick={() => onChangeText("")}
      >
        <ResetSearch color="inherit" fontSize="small" />
      </IconButton>
    </InputAdornment>
  ), [message, onChangeText]);

  return (
    <TextField
      placeholder={i18n.t("Search")}
      value={message}
      onChange={onChangeText}
      InputProps={(
        { "data-testid": "output_search" },
        { startAdornment, endAdornment }
      )}
      size="small"
    />
  );
};

export default SearchInput;
