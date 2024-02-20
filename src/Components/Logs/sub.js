import { makeSub } from "../../Utils/Sub";
import { DEFAULT_COLUMNS, DEFAULT_LEVELS, DEFAULT_SERVICE } from "./utils/Constants";

export
const logsSub = makeSub({
  robots: {},
  levels: DEFAULT_LEVELS,
  service: DEFAULT_SERVICE,
  columns: DEFAULT_COLUMNS,
  tags: {},
  message: "",
  selectedFromDate: null,
  selectedToDate: null,
});


