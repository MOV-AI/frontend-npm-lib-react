import { useRef, useState, useEffect } from "react";

export default function AutoSizer({ children }) {
  const parentRef = useRef();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(parentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={parentRef} style={{ width: '100%', height: '100%' }}>
      {size.width && size.height ? children(size) : null}
    </div>
  );
};


