import { useState, useEffect, RefObject } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  Placement,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
} from '@floating-ui/react';

interface FloatingLogicProps {
  placement?: Placement;
  trigger?: 'hover' | 'click';
  arrowRef?: RefObject<SVGSVGElement>;
}

export const useFloatingLogic = ({
  placement,
  trigger,
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
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);
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
