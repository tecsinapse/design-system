import React, { useState, useEffect, forwardRef } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  Placement,
  autoUpdate,
} from '@floating-ui/react';
import { twMerge } from 'tailwind-merge';

interface PopoverProps {
  children: React.ReactElement;
  content: React.ReactNode;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  className?: string;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const { children, content, trigger = 'click', placement, className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, update } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({
        flipAlignment: true,
        fallbackPlacements: ['right', 'bottom', 'left', 'top'],
      }),
      shift(),
    ],
  });

  useEffect(() => {
    if (isOpen) update();
  }, [isOpen, update]);

  const triggerProps = {
    ref: refs.setReference,
    ...(trigger === 'hover' && {
      onMouseEnter: () => setIsOpen(true),
      onMouseLeave: () => setIsOpen(false),
    }),
    ...(trigger === 'click' && {
      onClick: () => setIsOpen(prev => !prev),
    }),
  };

  return (
    <>
      {React.cloneElement(children, triggerProps)}
      {isOpen && (
        <div
          ref={ref || refs.setFloating}
          className={twMerge(
            'border border-gray-200 bg-black text-white p-4 rounded-md shadow-lg z-50',
            className
          )}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
          {content}
        </div>
      )}
    </>
  );
});

export default Popover;
