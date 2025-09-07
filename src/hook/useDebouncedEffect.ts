'use client';
import { useEffect } from 'react';

export const useDebouncedEffect = (
  effect: () => void,
  deps: React.DependencyList,
  delay: number
) => {

  useEffect(() => {
    if (deps.length === 0 || deps.every((dep) => !Boolean(dep))) return;

    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [...deps, delay]);

};
