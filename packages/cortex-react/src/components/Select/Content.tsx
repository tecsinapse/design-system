import React, { ReactNode, useRef } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';

interface ContentProps {
  children: ReactNode;
}

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
