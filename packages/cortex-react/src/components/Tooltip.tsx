import { FloatingArrow, Placement } from '@floating-ui/react';
import React, { forwardRef, useRef } from 'react';
import { useFloatingElement, type Delay } from '../hooks';
import { cloneWithProps } from '../utils';

interface TooltipProps {
  /** child element */
  children: React.ReactElement;
  text: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  width?: number;
  height?: number;
  /** Delay to display in milliseconds if `trigger` = `hover`
   *
   * Defaults to `{ open: 500, close: 0 }`
   * It's possible to provide only a number for same delay to show/hide
   */
  delay?: Delay;
  style?: React.CSSProperties;
}

/** Tooltip Component */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const {
      children,
      text,
      trigger = 'hover',
      placement = 'top',
      width,
      height,
      delay = { open: 500, close: 0 },
    } = props;
    const arrowRef = useRef(null);

    const {
      isOpen,
      triggerProps,
      x,
      y,
      strategy,
      refs,
      context,
      floatingStyles,
      getFloatingProps,
    } = useFloatingElement({ placement, arrowRef, trigger, delay });

    return (
      <>
        {cloneWithProps(children, triggerProps)}
        {isOpen ? (
          <div
            ref={ref || refs.setFloating}
            className={
              'bg-black text-white p-2 rounded z-50 shadow-md text-justify'
            }
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width,
              height,
              ...floatingStyles,
            }}
            {...getFloatingProps()}
          >
            {text}
            <FloatingArrow ref={arrowRef} context={context} fill="black" />
          </div>
        ) : null}
      </>
    );
  }
);
