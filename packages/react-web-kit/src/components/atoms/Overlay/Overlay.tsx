import React, { ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { ZIndex } from '@tecsinapse/react-core';
import { defaultStyleOverlay, transitionStylesOverlay } from './animations';
import { StyledOverlay } from './styled';

export interface OverlayProps {
  timeout?: number;
  open: boolean;
  onClose: () => void;
  zIndex: keyof ZIndex;
  children?: ReactNode;
}

const Overlay = ({
  timeout = 300,
  open,
  onClose,
  zIndex = 'default',
  children,
}: OverlayProps): JSX.Element => {
  return (
    <Transition in={open} timeout={timeout}>
      {state => (
        <StyledOverlay
          style={{
            ...defaultStyleOverlay,
            ...transitionStylesOverlay[state],
          }}
          onClick={open ? onClose : undefined}
          show={open}
          zIndex={zIndex}
        >
          {children}
        </StyledOverlay>
      )}
    </Transition>
  );
};

export default Overlay;
