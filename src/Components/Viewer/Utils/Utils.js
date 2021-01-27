export function selectOneAction(predicateActionList, defaultAction = () => {}) {
  return input => {
    predicateActionList.push({ predicate: e => true, action: defaultAction });
    for (let i = 0; i < predicateActionList.length; i++) {
      const predicateAction = predicateActionList[i];
      if (predicateAction.predicate(input)) {
        predicateAction.action();
        break;
      }
    }
  };
}
