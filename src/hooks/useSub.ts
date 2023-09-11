import { useState, useEffect } from "react";
import { Sub } from "../Utils/Sub";

type setState<T extends any> = (newState: T) => void;
export default
function useSub<T extends any>(sub: Sub<T>) {
  const [data, setData] = useState(sub.data.value) as [T, setState<T>];
  useEffect(() => sub.subscribe(setData), []);
  return data;
};
