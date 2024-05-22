// 
// This file incorporates code covered by the BSD-3-Clause License.
//
// License clause URL: https://github.com/tty-pt/sub?tab=BSD-3-Clause-1-ov-file#readme
// 
// BSD 3-Clause License
// 
// Copyright (c) 2022, Paulo Andre Azevedo Quirino
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 
// 3. Neither the name of the copyright holder nor the names of its
//    contributors may be used to endorse or promote products derived from
//    this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// 
// Source code incorporated: https://github.com/tty-pt/sub/blob/194d8912cb87bbc5262013c27ebaccc34946cbe2/src/main.tsx
// Source code contributors: Copyright (c) 2022, Paulo Andre Azevedo Quirino
// 


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
