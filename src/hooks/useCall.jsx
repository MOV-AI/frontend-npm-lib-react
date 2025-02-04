import { useCallback } from "react";

export default function useCall(callback, ...preArgs) {
  return useCallback(
    (...args) => callback.apply(null, preArgs.concat(args)),
    preArgs,
  );
}
