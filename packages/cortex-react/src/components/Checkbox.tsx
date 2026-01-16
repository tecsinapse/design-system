import { checkbox } from '@tecsinapse/cortex-core';
import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  /** Sets checkbox indeterminate value */
  indeterminate?: boolean;
  /** React ref */
  ref?: React.Ref<CheckboxRef>;
}

export interface CheckboxRef extends HTMLAttributes<HTMLInputElement> {
  setIndeterminate: (value: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
  const localRef = useRef<HTMLInputElement>(null);
  const { className, indeterminate, ref, ...rest } = props;

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
};
