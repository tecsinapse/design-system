import React, { ReactNode, useRef } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';

export interface ContentProps {
  /** child element */
  children: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  const { setIsOpen } = usePopoverContext();
  const ref = useRef(null);

  useOutsideClickListener({
    ref,
    onClickOutside: () => setIsOpen(false),
  });

  return <div ref={ref}>{children}</div>;
};
