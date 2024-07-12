import React, { ReactNode } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { SelectContext } from './context';
import { usePopoverContext } from '../Popover/Context';

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
  const { setIsOpen, refs } = usePopoverContext();

  useOutsideClickListener({
    ref: refs.domReference,
    onClickOutside: () => setIsOpen(false),
  });

  return (
    <SelectContext.Provider value={{ value, keyExtractor, labelExtractor }}>
      <div className="w-full relative bg-white">{children}</div>
    </SelectContext.Provider>
  );
};

export default Content;
