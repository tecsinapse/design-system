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

interface FloatingElementProps {
  placement?: Placement;
  trigger?: 'hover' | 'click';
  delay?: Delay;
  arrowRef?: RefObject<SVGSVGElement>;
  controlled?: boolean;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>> | undefined;
}

export const useFloatingElement = ({
  placement,
  trigger,
  delay,
  arrowRef,
  controlled,
  isOpen,
  setIsOpen,
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
