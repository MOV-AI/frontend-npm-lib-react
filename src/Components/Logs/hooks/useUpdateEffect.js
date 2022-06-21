import { useEffect, useRef } from "react";

const useUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

export default useUpdateEffect;
