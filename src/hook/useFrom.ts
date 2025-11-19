import { useCallback, useEffect, useReducer, useRef } from 'react';

/* ---------- Types ---------- */
type ValidationFn<T> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  state?: T,
  additionalData?: Record<string, object>
) => boolean;

type ValidationRule<T> =
  | [ValidationFn<T>, string] // función + mensaje de error
  | [ValidationFn<T>, string, true]; // requiere estado completo

type Validations<T> = Partial<Record<keyof T, ValidationRule<T>>>;

type Errors<T> = Partial<Record<`${Extract<keyof T, string>}Valid`, string | null>>;

interface FormState<T> {
  values: T;
  errors: Errors<T>;
  validations: Validations<T>;
  additionalData: Record<string, object>;
  disabledMap: React.MutableRefObject<Map<string, boolean>>;
}

type Action<T> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { type: 'CHANGE'; field: keyof T; value: any }
  | { type: 'VALIDATE_ALL' }
  | { type: 'VALIDATE_ONE'; field: keyof T }
  | { type: 'RESET'; initialState: T }
  | { type: 'DATA_RESET_VALUE'; initialState: Partial<T> }
  | { type: 'DATA_RESET'; dataReset: Partial<T>; initialState: T }
  | { type: 'SET_VALIDATIONS'; validations: Validations<T> };

interface UseFormProps<T> {
  initialState: T;
  activeValidation?: boolean;
  validations?: Validations<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalData?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeValueCallback?: (data: { name: string; value: any }) => void;
}

/* ---------- Default Validations ---------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultValidations: Validations<any> = {
  email: [
    (value: string) => /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(value),
    'El correo no es válido',
  ],
  password: [
    (value: string) => value.trim().length >= 6,
    'La contraseña debe tener al menos 6 caracteres',
  ],
  passwordConfirm: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fields: any, state: any) => fields === state.password,
    'Las contraseñas no coinciden',
    true,
  ],
  title: [(value: string) => value.trim().length > 0, 'El título es obligatorio'],
};

/* ---------- Reducer ---------- */

function validateField<T>(
  key: keyof T,
  state: T,
  validations: Validations<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalData: Record<string, any>,
  disabledMap: React.MutableRefObject<Map<string, boolean>>
): [boolean, string] {
  if (disabledMap.current.has(key as string)) return [true, ''];
  const rule = validations[key];
  if (!rule) return [true, ''];
  const [fn, msg, needsWholeState] = rule;
  const valid = needsWholeState
    ? fn(state[key], state, additionalData)
    : fn(state[key]);
  return [valid, msg];
}

function formReducer<T>(state: FormState<T>, action: Action<T>): FormState<T> {
  switch (action.type) {
    case 'CHANGE': {
      const newState = { ...state.values, [action.field]: action.value };
      return { ...state, values: newState };
    }
    case 'VALIDATE_ALL': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errors: Errors<{ [key: string]: any }> = {};
      for (const key of Object.keys(state.values || {}) as (keyof T)[]) {
        const [valid, msg] = validateField(
          key,
          state.values,
          state.validations,
          state.additionalData,
          state.disabledMap
        );
        errors[`${String(key)}Valid`] = valid ? null : msg;
      }
      return { ...state, errors };
    }
    case 'VALIDATE_ONE': {
      const [valid, msg] = validateField(
        action.field,
        state.values,
        state.validations,
        state.additionalData,
        state.disabledMap
      );
      return {
        ...state,
        errors: {
          ...state.errors,
          [`${String(action.field)}Valid`]: valid ? null : msg,
        },
      };
    }
    case 'RESET': {
      return {
        ...state,
        values: action.initialState,
        errors: {},
      };
    }
    case 'DATA_RESET_VALUE': {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.initialState,
        },
      };
    }
    case 'DATA_RESET': {
      const resetState = Object.entries(state.values || {}).map(([key, value]) => {
        return key in action.dataReset
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? [key, (action.initialState as any)[key]]
          : [key, value];
      });

      const resetErrors = Object.entries(state.errors).map(([key, value]) => {
        return key in action.dataReset ? [key, ''] : [key, value];
      });

      return {
        ...state,
        values: Object.fromEntries(resetState) as T,
        errors: Object.fromEntries(resetErrors) as Errors<T>,
      };
    }
    case 'SET_VALIDATIONS':
      return {
        ...state,
        validations: action.validations,
      };
    default:
      return state;
  }
}

/* ---------- Hook useForm ---------- */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useForm<T extends Record<string, any>>({
  initialState,
  activeValidation = true,
  validations = {},
  additionalData = {},

  changeValueCallback = undefined,
}: UseFormProps<T>) {
  const mergedValidations: Validations<T> = {
    ...(defaultValidations as Validations<T>),
    ...validations,
  };

  const changeValueCallbackRef = useRef(changeValueCallback);
  const disabledMap = useRef(new Map<string, boolean>());
  const userChangedFields = useRef(new Set<string>());
  const isInitialForm = useRef(false);

  const [state, dispatch] = useReducer(formReducer<T>, {
    values: initialState,
    errors: {},
    validations: mergedValidations,
    additionalData,
    disabledMap,
  });

  useEffect(() => {
    if (changeValueCallback) {
      changeValueCallbackRef.current = changeValueCallback;
    }
  }, [changeValueCallback]);

  const onInitialFrom = (newInitialState: T) => {
    isInitialForm.current = true;
    userChangedFields.current.clear();
    dispatch({ type: 'RESET', initialState: newInitialState });
    window.requestAnimationFrame(() => {
      isInitialForm.current = false;
    });
  };

  const onInitialValues = (initialValue: Partial<T>) => {
    if (!initialValue) return;
    isInitialForm.current = true;
    userChangedFields.current.clear();
    dispatch({ type: 'DATA_RESET_VALUE', initialState: initialValue });
    window.requestAnimationFrame(() => {
      isInitialForm.current = false;
    });
  };

  const onValueChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | any | unknown; type?: string }) => {

      if (!e) return;
      const name = 'target' in e ? e.target.name : e.name;
      let value = 'target' in e ? e.target.value : e.value;
      const type = 'target' in e ? e.target.type : e.type;

      if (type === 'number' && value !== '') {
        const num = Number(value);
        value = isNaN(num) ? '' : num;
      }

      if (disabledMap.current.has(name)) {
        disabledMap.current.delete(name);
      }

      dispatch({ type: 'CHANGE', field: name as keyof T, value });

      if (activeValidation) {
        dispatch({ type: 'VALIDATE_ONE', field: name as keyof T });
      }

      if (!isInitialForm.current) {
        userChangedFields.current.add(name);
        changeValueCallbackRef.current?.({ name, value });
      }
    },
    [activeValidation]
  );

  const isFieldChangedByUser = (field: keyof T) => {
    return userChangedFields.current.has(field as string);
  };

  const isAnyFieldChangedByUser = () => {
    return userChangedFields.current.size > 0;
  };

  const setChangeValueCallback = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (data: { name: string; value: any }) => void
  ) => {
    changeValueCallbackRef.current = callback;
  };

  const validateForm = useCallback(() => {
    const errors: Errors<{ [key: string]: string }> = {};
    for (const key of Object.keys(state.values) as (keyof T)[]) {
      const [valid, msg] = validateField(
        key,
        state.values,
        state.validations,
        state.additionalData,
        disabledMap
      );
      errors[`${String(key)}Valid`] = valid ? null : msg;
    }

    dispatch({ type: 'VALIDATE_ALL' });
    return {
      isValid: Object.values(errors).every((e) => e == null),
      errors,
    };
  }, [state.values, state.validations, state.additionalData]);

  const onResetForm = useCallback(
    (dataReset?: Partial<T>) => {
      if (!dataReset) {
        dispatch({ type: 'RESET', initialState });
        return;
      }
      dispatch({ type: 'DATA_RESET', dataReset, initialState });
    },
    [initialState]
  );

  const onSubmitForm = useCallback(
    (callback: (values: T) => void) =>
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputDisables = event.currentTarget.querySelectorAll<HTMLInputElement>('input:disabled');
        if (inputDisables) {
          for (const element of inputDisables) {
            const { name, disabled } = element;
            disabledMap.current.set(name, disabled);
          }
        } else {
          disabledMap.current.clear();
        }

        const { isValid } = validateForm();
        if (activeValidation && !isValid) return;
        callback(state.values);
      },
    [activeValidation, validateForm, state.values]
  );

  const isFormValid = useCallback(() => {
    return Object.values(state.errors).every((e) => e == null);
  }, [state.errors]);

  return {
    formState: state.values,
    formValidation: state.errors,
    validateForm,
    onValueChange,
    onResetForm,
    onSubmitForm,
    onInitialFrom,
    onInitialValues,
    isFormValid,
    setChangeValueCallback,
    isAnyFieldChangedByUser,
    isFieldChangedByUser,
  };
}