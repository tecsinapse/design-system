import React, { ReactNode } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { SelectContext } from './context';
import { usePopoverContext } from '../Popover/PopoverContext';

interface ContentProps<T> {
  children: ReactNode;
  keyExtractor: (value: T) => string;
  labelExtractor: (value: T) => string;
  value?: T;
}

const Content = <T,>({
  children,
  keyExtractor,
  labelExtractor,
  value,
}: ContentProps<T>) => {
  const { isOpen, setIsOpen, refs } = usePopoverContext();

  useOutsideClickListener({
    ref: refs.domReference,
    onClickOutside: () => setIsOpen(false),
  });

  return (
    <SelectContext.Provider
      value={{ value, isOpen, setIsOpen, keyExtractor, labelExtractor }}
    >
      <div className="w-full relative bg-white">{children}</div>
    </SelectContext.Provider>
  );
};

export default Content;
