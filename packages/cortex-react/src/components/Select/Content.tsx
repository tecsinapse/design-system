import React, { ReactNode, useRef } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';
import { SelectContext } from './context';

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
  const { setIsOpen } = usePopoverContext();
  const ref = useRef(null);

  useOutsideClickListener({
    ref,
    onClickOutside: () => setIsOpen(false),
  });

  return (
    <SelectContext.Provider value={{ value, keyExtractor, labelExtractor }}>
      <div className="w-full relative bg-white" ref={ref}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export default Content;
