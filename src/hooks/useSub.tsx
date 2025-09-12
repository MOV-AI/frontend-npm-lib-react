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

import React, { useState, useEffect, ComponentType } from "react";
import { Sub } from "../Utils/Sub";

type setState<T> = (newState: T) => void;
export default function useSub<T>(sub: Sub<T>) {
  const [data, setData] = useState(sub.data.value) as [T, setState<T>];
  useEffect(() => sub.subscribe(setData), []);
  return data;
}

export function withSub<T>(sub: Sub<T>, Component: ComponentType) {
  return function (props: any) {
    const subVal = useSub<T>(sub);
    return <Component {...props} sub={subVal} />;
  };
}
