import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SelectContext } from './context';

export interface SelectRootProps<T> {
  children: ReactNode;
  value?: T;
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
}

export const SelectRoot = <T,>({
  children,
  value,
  keyExtractor,
  labelExtractor,
}: SelectRootProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen?.(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <SelectContext.Provider
      value={{ value, open, setOpen, keyExtractor, labelExtractor }}
    >
      <div className="w-full relative bg-white" ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};
