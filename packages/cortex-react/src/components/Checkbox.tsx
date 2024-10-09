import { checkbox } from '@tecsinapse/cortex-core';
import React, {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  /** Sets checkbox indeterminate value */
  indeterminate?: boolean;
}

export interface CheckboxRef extends HTMLAttributes<HTMLInputElement> {
  setIndeterminate: (value: boolean) => void;
}

export const Checkbox = forwardRef<
  CheckboxRef,
  CheckboxProps & HTMLAttributes<HTMLInputElement>
>((props: CheckboxProps & HTMLAttributes<HTMLInputElement>, ref) => {
  const localRef = useRef<HTMLInputElement>(null);
  const { className, indeterminate, ...rest } = props;

  const setIndeterminate = useCallback((value: boolean) => {
    if (localRef?.current) {
      localRef.current.indeterminate = value;
      localRef.current.checked = false;
    }
  }, []);

  useEffect(() => {
    setIndeterminate(Boolean(indeterminate));
  }, [indeterminate]);

  useImperativeHandle(ref, () => {
    return {
      ...localRef.current,
      setIndeterminate,
    } as CheckboxRef;
  });

  return (
    <input
      type={'checkbox'}
      className={checkbox({ className })}
      ref={localRef}
      {...rest}
    />
  );
});
