export function isObject(item) {
  return Object.prototype.toString.call(item) === "[object Object]";
}

/**
 * Validate value with its data type
 * @param {*} param : Row data value
 * @param {*} type : Row data type
 * @returns Object with pre-validation value and result (Boolean: isValid)
 */
export const validateDataType = (param, type = "default") => {
  const value = DATA_TYPES[type].preValidation(param);
  return DATA_TYPES[type].validation(value).then((result) => {
    return { value, isValid: result.success, error: result.error };
  });
};

export function selectOneAction(predicateActionList, defaultAction = () => {}) {
  return (input) => {
    predicateActionList.push({ predicate: (e) => true, action: defaultAction });
    for (let i = 0; i < predicateActionList.length; i++) {
      const predicateAction = predicateActionList[i];
      if (predicateAction.predicate(input)) {
        predicateAction.action();
        break;
      }
    }
  };
}
