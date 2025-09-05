'use client';
import { useState } from "react";

type ValidatorFn = (value: string) => string | null;

interface InputConfig {
  [key: string]: {
    initialValue?: string;
    validators?: ValidatorFn[];
  };
}

interface UseInputReturn<T extends InputConfig> {
  values: { [K in keyof T]: string };
  errors: { [K in keyof T]?: string | null };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  reset: () => void;
}

export const useInput = <T extends InputConfig>(config: T): UseInputReturn<T> => {
  const [values, setValues] = useState<{ [K in keyof T]: string }>(() => {
    const initial: Partial<{ [K in keyof T]: string }> = {};
    for (const key in config) {
      initial[key] = config[key].initialValue ?? "";
    }
    return initial as { [K in keyof T]: string };
  });

  const [errors, setErrors] = useState<{ [K in keyof T]?: string | null }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    let valid = true;
    const newErrors: { [K in keyof T]?: string | null } = {};

    for (const key in config) {
      const validators = config[key].validators ?? [];
      for (const validator of validators) {
        const error = validator(values[key]);
        if (!error) { //?
          newErrors[key] = error;
          valid = false;
          break; // detener en el primer error
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const reset = () => {
    const initial: Partial<{ [K in keyof T]: string }> = {};
    for (const key in config) {
      initial[key] = config[key].initialValue ?? "";
    }
    setValues(initial as { [K in keyof T]: string });
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
  };
};
