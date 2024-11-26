import { useState, useEffect, useCallback } from "react";

export default function useAutoScroll(ref, dependencies, diff = 10) {
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    if (isAutoScroll) ref.current.scrollTop = ref.current.scrollHeight;
  }, dependencies);

  const onScroll = useCallback(() => {
    const container = ref.current;
    const isAtBottom = container.scrollHeight - container.scrollTop <= diff;
    setIsAutoScroll(isAtBottom);
  }, []);

  return { onScroll, isAutoScroll };
}
