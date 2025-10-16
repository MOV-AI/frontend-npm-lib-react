import React from "react";
import i18n from "../../../../i18n";
import { Typography } from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import FiltersIcon from "./_shared/FiltersIcon/FiltersIcon";
import { useSettingsStyles } from "../../styles";

import { MENU_PROPS } from "./_shared/Constants";
import { COLUMNS_LABEL } from "./../../utils/Constants";
import useSelector from "./../useSelector";

const SettingsPopover = () => {
  const classes = useSettingsStyles();
  const translatedColumns = Object.fromEntries(
    Object.entries(COLUMNS_LABEL).map(([key, value]) => [key, i18n.t(value)]),
  );
  const columnsSelector = useSelector(translatedColumns, "columns", MENU_PROPS);

  return (
    <FiltersIcon
      icon={<TuneIcon></TuneIcon>}
      title={i18n.t("Configuration")}
      data_testid="Configuration"
    >
      <div className={classes.columnsFilter}>
        <Typography component="div" className={classes.inputHeader}>
          {`${i18n.t("Columns")}:`}
        </Typography>
        {columnsSelector}
      </div>
    </FiltersIcon>
  );
};

export default SettingsPopover;
