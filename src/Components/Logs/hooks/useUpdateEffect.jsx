import { useEffect, useState } from "react";

const useUpdateEffect = (fn, inputs) => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    if (didMount)
      return fn();
    setDidMount(true);
  }, inputs.concat([fn]));
};

export default useUpdateEffect;
