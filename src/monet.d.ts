declare module 'monet' {
  export type Maybe<T> = Just<T> | Nothing;

  export class Just<T> {
    constructor(value: T);
    isJust(): this is Just<T>;
    isNothing(): this is Nothing;
    // ... other methods like map, flatMap, etc.
  }

  export class Nothing {
    isJust(): this is Just<any>;
    isNothing(): this is Nothing;
    // ... other methods
  }
}
