import { useEffect, useState } from "react";

export const useDebouncedEffect = (
  effect: () => void,
  deps: React.DependencyList,
  delay: number
) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (deps.length === 0 || deps.every((dep) => !Boolean(dep))) return;

    setIsLoading(true);
    const handler = setTimeout(() => {
      effect();
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);

  return {
    isLoading
  }
};
