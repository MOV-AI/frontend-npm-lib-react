import { useState, useEffect, Dispatch, SetStateAction } from "react";

export type EmitNow<T extends any> = (...args: any[]) => T;
export type Emit<T extends any> = (...args: any[]) => T | Promise<T>;

export
interface Sub<T extends any> {
  update: (val: T) => T;
  current: () => T;
  subscribe: Function;
  data: {
    value: T;
  };
  makeEmitNow: (cb?: EmitNow<T>) => (...args: any[]) => T;
  makeEmit: (cb?: Emit<T>) => (...args: any[]) => Promise<T>;
  boundEmit: (path: string) => (arg: any) => T;
  use: () => T;
  set: (path: string, value: any) => T;
}

export
type setState<T extends any> = (newState: T) => void;

export
function makeSub<T extends any>(defaultData: T): Sub<T> {
  const subs = new Map<Function, boolean>();
  const valueMap: { value: T } = { value: defaultData };

  function update(obj: T): T {
    valueMap.value = obj;
    for (const [sub] of subs)
      sub(obj);
    return obj;
  }

  function subscribe(sub: setState<T>) {
    subs.set(sub, true);
    sub(valueMap.value);
    return () => {
      subs.delete(sub);
    };
  }

  function makeEmitNow(cb: EmitNow<T> = (_old: T, a: T) => a) {
    return (...args: any[]) => {
      return update((cb ?? ((a: T) => a))(valueMap.value, ...args) as T);
    };
  }

  function makeEmit(cb: Emit<T> = (_old: T, a: T): Promise<T> | T => a) {
    return async (...args: any[]) => {

      try {
        return update(await (cb ?? ((a: T) => a))(valueMap.value, ...args));
      } catch (e) {
        return Promise.reject(undefined);
      }
    };
  }

  function boundEmit(path: string = "") {
    if (path)
      return function (value: any) {
        const obj = valueMap.value as object;
        return update({ ...obj, [path]: value } as T);
      };
    else
      return function (value: any) {
        return update(value);
      };
  }

  function set(path: string = "", value: any) {
    if (path) {
      const obj = valueMap.value as object;
      return update({ ...obj, [path]: value } as T);
    } else
      return update(value);
  }

  function use() {
    const [data, setData] = useState(valueMap.value) as [T, Dispatch<SetStateAction<T>>];
    useEffect(() => subscribe(setData), []);
    return data;
  };

  function current() {
    return valueMap.value;
  }

  return { current, update, subscribe, data: valueMap, makeEmit, makeEmitNow, boundEmit, use, set };
}
