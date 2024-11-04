import { useState, useEffect, useRef } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const ref = useRef<NodeJS.Timeout | number>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    ref.current = handler;

    return () => clearTimeout(ref.current);
  }, [value, delay]);

  return debouncedValue;
}
