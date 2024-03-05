import React from "react";
import i18n from "i18next";
import { Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { useSettingsStyles } from "../../styles";

import { MENU_PROPS } from "./_shared/Constants";
import { COLUMNS_LABEL } from "./../../utils/Constants";
import useSelector from "./../useSelector";

const SettingsPopover = () => {
  const classes = useSettingsStyles();
  const columnsSelector = useSelector(COLUMNS_LABEL, "columns", MENU_PROPS);

  return (
    <FiltersIcon icon={<TuneIcon></TuneIcon>} title={i18n.t("Configuration")}>
      <div className={classes.columnsFilter}>
        <Typography component="div" className={classes.inputHeader}>
          {`${i18n.t("Columns")}:`}
        </Typography>
        { columnsSelector }
      </div>
    </FiltersIcon>
  );
};

export default SettingsPopover;
