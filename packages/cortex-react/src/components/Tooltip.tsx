import React, { useState, useEffect, forwardRef, useRef } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  Placement,
  FloatingArrow,
  autoUpdate,
} from '@floating-ui/react';

interface TooltipProps {
  children: React.ReactElement;
  tooltipText: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
  const {
    children,
    tooltipText,
    trigger = 'hover',
    placement = 'top',
    width,
    height,
    style,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { x, y, strategy, refs, update, context, floatingStyles } = useFloating(
    {
      placement,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(10),
        flip({
          flipAlignment: true,
          fallbackPlacements: ['right', 'bottom', 'left', 'top'],
        }),
        shift(),
        arrow({ element: arrowRef }),
      ],
    }
  );

  useEffect(() => {
    if (isOpen) update();
  }, [isOpen, update]);

  const triggerProps = {
    ref: refs.setReference,
    ...(trigger === 'hover' && {
      onMouseEnter: () => setIsOpen(true),
      onMouseLeave: () => setIsOpen(false),
    }),
    ...(trigger === 'click' && { onClick: () => setIsOpen(prev => !prev) }),
  };

  const tooltipStyle = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
    width: width,
    height: height,
    ...floatingStyles,
    ...style,
  };

  return (
    <>
      {React.cloneElement(children, triggerProps)}
      {isOpen && (
        <div
          ref={ref || refs.setFloating}
          className={
            'bg-black text-white p-2 rounded z-50 shadow-md text-justify'
          }
          style={tooltipStyle}
        >
          {tooltipText}
          <FloatingArrow ref={arrowRef} context={context} fill="black" />
        </div>
      )}
    </>
  );
});

export default Tooltip;
