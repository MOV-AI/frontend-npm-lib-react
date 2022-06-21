import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ResetSearch from "@material-ui/icons/Close";
import { useSearchInputStyles } from "../../styles";

const SearchInput = props => {
  // Translation hook
  const { t } = useTranslation();
  // Props
  const { messageRegex, handleMessageRegex } = props;
  // Style hook
  const classes = useSearchInputStyles();

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * On change text input
   * @param {Event} On Change event
   */
  const onChangeText = useCallback(event => {
    handleMessageRegex(event.target.value);
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                      Adornments                                      *
   *                                                                                      */
  //========================================================================================

  /**
   * Render input start adornment
   */
  const renderStartAdornment = useCallback(() => {
    return (
      <InputAdornment className={classes.iconAdornment} position="start">
        <SearchIcon data-testid="output_icon" fontSize="small" />
      </InputAdornment>
    );
  }, [classes]);

  /**
   * Render input end adornment
   */
  const renderEndAdornment = useCallback(() => {
    return (
      <InputAdornment position="end">
        <IconButton
          data-testid="output_button"
          disabled={!messageRegex}
          onClick={() => handleMessageRegex("")}
        >
          <ResetSearch color="inherit" fontSize="small" />
        </IconButton>
      </InputAdornment>
    );
  }, [messageRegex, handleMessageRegex]);

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================

  return (
    <TextField
      className={classes.searchText}
      placeholder={t("Search")}
      value={messageRegex}
      onChange={onChangeText}
      InputProps={
        ({ "data-testid": "output_search" },
        {
          startAdornment: renderStartAdornment(),
          endAdornment: renderEndAdornment()
        })
      }
      size="small"
    />
  );
};

export default SearchInput;
