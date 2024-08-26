import clsx from 'clsx';
import React, { useRef } from 'react';
import { useOutsideClickListener } from '../../hooks';
import { usePopoverContext } from '../Popover/Context';
import { ContentProps } from './types';

export const Content = ({ children, className }: ContentProps) => {
  const { setIsOpen } = usePopoverContext();
  const ref = useRef(null);

  useOutsideClickListener({
    ref,
    onClickOutside: () => setIsOpen(false),
  });

  return (
    <div className={clsx('w-full relative', className)} ref={ref}>
      {children}
    </div>
  );
};
