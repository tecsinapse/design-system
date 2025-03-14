import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export type Delay =
  | number
  | {
      open?: number;
      close?: number;
    };

export interface FloatingElementProps {
  placement?: Placement;
  trigger?: 'hover' | 'click';
  delay?: Delay;
  arrowRef?: RefObject<SVGSVGElement>;
  controlled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  fallbackPlacements?: Array<Placement>;
}

export const useFloatingElement = ({
  placement,
  trigger,
  delay,
  arrowRef,
  controlled,
  isOpen,
  setIsOpen,
  fallbackPlacements = ['right', 'bottom', 'left', 'top'],
}: FloatingElementProps) => {
  const [openUncontrolled, onOpenChangeUncontrolled] = useState(false);

  const { x, y, strategy, refs, update, context, floatingStyles } = useFloating(
    {
      placement,
      whileElementsMounted: autoUpdate,
      open: controlled ? isOpen : openUncontrolled,
      onOpenChange: controlled ? setIsOpen : onOpenChangeUncontrolled,
      middleware: [
        offset(10),
        flip({
          flipAlignment: true,
          fallbackPlacements,
        }),
        shift(),
        size({
          apply({ rects, elements }) {
            elements.floating.style.width = `${rects.reference.width}px`;
          },
        }),
        ...(arrowRef ? [arrow({ element: arrowRef })] : []),
      ],
    }
  );
  const click = useClick(context, { enabled: trigger === 'click' });
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const hover = useHover(context, {
    enabled: trigger === 'hover',
    delay,
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    hover,
  ]);
  useEffect(() => {
    if (controlled && isOpen) update();
    else if (openUncontrolled) update();
  }, [openUncontrolled, update, isOpen]);

  const triggerProps = {
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  return {
    isOpen: controlled ? (isOpen as boolean) : openUncontrolled,
    setIsOpen: controlled
      ? (setIsOpen as Dispatch<SetStateAction<boolean>>)
      : onOpenChangeUncontrolled,
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
