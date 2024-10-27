import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>();
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
