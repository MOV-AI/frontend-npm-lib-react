import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ResetSearch from "@mui/icons-material/ResetSearch";
// import { useSearchInputStyles } from "../../styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MEDIA_QUERY_BREAKPOINT } from "../../../../Utils/Constants";

const SearchInput = props => {
  // Translation hook
  const { t } = useTranslation();
  // Props
  const { messageRegex, handleMessageRegex } = props;
  // Style hook
  const bigScreen = useMediaQuery(MEDIA_QUERY_BREAKPOINT);

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
  const startAdornment = (
    <InputAdornment className="icon-adornment" position="start">
      <SearchIcon data-testid="output_icon" fontSize="small" />
    </InputAdornment>
  );

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
      className={bigScreen ? "search-text" : "small-search-text"}
      placeholder={t("Search")}
      value={messageRegex}
      onChange={onChangeText}
      InputProps={
        ({ "data-testid": "output_search" },
        {
          startAdornment: startAdornment,
          endAdornment: renderEndAdornment()
        })
      }
      size="small"
    />
  );
};

export default SearchInput;
