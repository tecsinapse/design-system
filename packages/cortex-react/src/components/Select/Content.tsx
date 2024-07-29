import React, { useRef } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';
import { ContentProps } from './types';

export const Content = ({ children }: ContentProps) => {
  const { setIsOpen } = usePopoverContext();
  const ref = useRef(null);

  useOutsideClickListener({
    ref,
    onClickOutside: () => setIsOpen(false),
  });

  return (
    <div className="w-full relative bg-white" ref={ref}>
      {children}
    </div>
  );
};
