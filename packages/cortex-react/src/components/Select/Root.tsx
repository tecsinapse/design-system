import React, { ReactNode, useRef, useState } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { SelectContext } from './context';
import { Popover } from '../Popover/Popover';

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

  useOutsideClickListener({
    ref: ref,
    onClickOutside: () => setOpen?.(false),
  });

  return (
    <SelectContext.Provider
      value={{ value, open, setOpen, keyExtractor, labelExtractor }}
    >
      <Popover.Root placement="bottom" trigger="click">
        <div className="w-full relative bg-white" ref={ref}>
          {children}
        </div>
      </Popover.Root>
    </SelectContext.Provider>
  );
};
