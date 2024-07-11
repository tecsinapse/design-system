import React from 'react';
import clsx from 'clsx';
import { usePopoverContext } from './PopoverContext';

export interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  open?: boolean;
}

const PopoverContent = ({ children, className, open }: PopoverContentProps) => {
  const { isOpen, x, y, strategy, floatingStyles, refs } = usePopoverContext();

  const shouldOpen = open ?? isOpen;

  return (
    <>
      {shouldOpen ? (
        <div
          ref={refs.setFloating}
          className={clsx(
            'border border-gray-200 bg-black  p-4 rounded-md shadow-lg z-50',
            className
          )}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            ...floatingStyles,
          }}
        >
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PopoverContent;
