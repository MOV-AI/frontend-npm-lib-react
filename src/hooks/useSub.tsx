import React, { useState, useEffect, ComponentType } from "react";
import { Sub } from "../Utils/Sub";

type setState<T extends any> = (newState: T) => void;
export default
function useSub<T extends any>(sub: Sub<T>) {
  const [data, setData] = useState(sub.data.value) as [T, setState<T>];
  useEffect(() => sub.subscribe(setData), []);
  return data;
};

export function withSub<T>(sub: Sub<T>, Component: ComponentType) {
  return function (props: any) {
    const subVal = useSub<T>(sub);
    return <Component { ...props } sub={subVal} />;
  }
}
