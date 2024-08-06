import { FloatingArrow, Placement } from '@floating-ui/react';
import React, { forwardRef, useRef } from 'react';
import { useFloatingLogic } from '../hooks';
import { cloneWithProps } from './utils';

interface TooltipProps {
  /** child element */
  children: React.ReactElement;
  text: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  width?: number;
  height?: number;
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
    } = useFloatingLogic({ placement, arrowRef, trigger });

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
          >
            {text}
            <FloatingArrow ref={arrowRef} context={context} fill="black" />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default Tooltip;
