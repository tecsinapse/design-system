import { Placement } from '@floating-ui/react';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';

import { useFloatingElement } from '../../hooks';
import { Context } from './Context';

export interface ControlledProps {
  controlled: true;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fallbackPlacements?: Array<Placement>;
}

export interface UncontrolledProviderProps {
  /** child element */
  children: ReactNode;
  placement?: Placement;
  fallbackPlacements?: Array<Placement>;
  trigger?: 'hover' | 'click';
  controlled?: false;
}

export interface ControlledPopoverProviderProps
  extends Omit<UncontrolledProviderProps, 'controlled'>,
    ControlledProps {}

export type PopoverProviderProps =
  | UncontrolledProviderProps
  | ControlledPopoverProviderProps;

export const PopoverProvider = ({
  children,
  placement,
  trigger,
  fallbackPlacements,
  ...props
}: PopoverProviderProps) => {
  const floatingLogic = useFloatingElement({
    placement,
    trigger,
    fallbackPlacements,
    ...props,
  });

  return (
    <Context.Provider value={{ ...floatingLogic }}>{children}</Context.Provider>
  );
};
