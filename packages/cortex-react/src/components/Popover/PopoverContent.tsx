import React, { useEffect } from 'react';
import clsx from 'clsx';
import { usePopoverContext } from './PopoverContext';
import { Placement } from '@floating-ui/react';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  placement?: Placement;
}

const PopoverContent = ({
  children,
  className,
  placement,
}: PopoverContentProps) => {
  const { isOpen, x, y, strategy, floatingStyles, setPlacement, refs } =
    usePopoverContext();

  useEffect(() => {
    if (placement && setPlacement) {
      setPlacement(placement);
    }
  }, [placement, setPlacement]);

  return (
    <>
      {isOpen ? (
        <div
          ref={refs.setFloating}
          className={clsx(
            'border border-gray-200 bg-black text-white p-4 rounded-md shadow-lg z-50',
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
