import { Sub } from "@mov-ai/mov-fe-lib-sub";
import {
  DEFAULT_COLUMNS,
  DEFAULT_LEVELS,
  DEFAULT_SERVICE,
} from "./utils/Constants";

export const logsSub = new Sub({
  robots: {},
  levels: DEFAULT_LEVELS,
  service: DEFAULT_SERVICE,
  columns: DEFAULT_COLUMNS,
  tags: {},
  message: "",
  selectedFromDate: null,
  selectedToDate: null,
});
