import clsx from 'clsx';
import React from 'react';
import { usePopoverContext } from './Context';
import { FloatingFocusManager } from '@floating-ui/react';

export interface PopoverContentProps {
  /** child element */
  children: React.ReactNode;
  className?: string;
}

export const PopoverContent = ({
  children,
  className,
}: PopoverContentProps) => {
  const {
    isOpen,
    x,
    y,
    strategy,
    floatingStyles,
    refs,
    getFloatingProps,
    context,
  } = usePopoverContext();

  return (
    <>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            className={clsx(
              'border border-gray-200 bg-black p-[0px] rounded-md shadow-lg z-popover',
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
        </FloatingFocusManager>
      )}
    </>
  );
};
