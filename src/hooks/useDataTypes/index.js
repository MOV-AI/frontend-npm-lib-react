import { useMemo, useCallback } from "react";
import { useTheme } from "@material-ui/styles";
import DataTypeManager from "./DataTypes/DataTypeManager";

const useDataTypes = (options = {}) => {
  const { stringOutput } = options;

  // Hooks
  const theme = useTheme();
  const dataTypeManager = useMemo(
    () => new DataTypeManager({ theme, stringOutput }),
    [],
  );

  /**
   * Get list of valid data types to be displayed in the select box
   * @param {Array} excluded : Excluded keys
   * @returns {Array} List of valid data types to be displayed in the select box
   */
  const getDataTypes = useCallback(
    (excluded = []) => {
      return dataTypeManager
        .getTypeKeys()
        .filter((type) => !excluded.includes(type));
    },
    [dataTypeManager],
  );

  /**
   * Return a type
   */
  const getType = useCallback(
    (type) => dataTypeManager.getType(type),
    [dataTypeManager],
  );

  return useMemo(
    () => ({
      getDataTypes,
      getType,
    }),
    [getDataTypes, getType],
  );
};

export default useDataTypes;
