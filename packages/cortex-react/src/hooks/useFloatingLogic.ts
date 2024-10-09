import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { RefObject, useEffect, useState } from 'react';

interface FloatingLogicProps {
  placement?: Placement;
  trigger?: 'hover' | 'click';
  delay?:
    | number
    | {
        open?: number;
        close?: number;
      };
  arrowRef?: RefObject<SVGSVGElement>;
}

export const useFloatingLogic = ({
  placement,
  trigger,
  delay,
  arrowRef,
}: FloatingLogicProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, update, context, floatingStyles } = useFloating(
    {
      placement,
      whileElementsMounted: autoUpdate,
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [
        offset(10),
        flip({
          flipAlignment: true,
          fallbackPlacements: ['right', 'bottom', 'left', 'top'],
        }),
        shift(),
        ...(arrowRef ? [arrow({ element: arrowRef })] : []),
      ],
    }
  );
  const click = useClick(context, { enabled: trigger === 'click' });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, { enabled: trigger === 'hover', delay });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
  ]);
  useEffect(() => {
    if (isOpen) update();
  }, [isOpen, update]);

  const triggerProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  return {
    isOpen,
    setIsOpen,
    x,
    y,
    strategy,
    refs,
    context,
    floatingStyles,
    triggerProps,
    getReferenceProps,
    getFloatingProps,
  };
};
