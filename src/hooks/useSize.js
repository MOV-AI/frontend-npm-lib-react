import { useEffect } from "react";

export default function useSize(onResize) {
  useEffect(() => {
    setTimeout(onResize, 0);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);
}
