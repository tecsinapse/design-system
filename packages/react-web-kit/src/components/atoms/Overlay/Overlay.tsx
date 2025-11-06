import React, { ReactNode, useRef } from 'react';
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
}: OverlayProps): React.ReactElement => {
  const transitionRef = useRef(null);
  return (
    <Transition in={open} timeout={timeout} nodeRef={transitionRef}>
      {state => (
        <StyledOverlay
          style={{
            ...defaultStyleOverlay,
            ...transitionStylesOverlay[state],
          }}
          onClick={open ? onClose : undefined}
          show={open}
          zIndex={zIndex}
          ref={transitionRef}
        >
          {children}
        </StyledOverlay>
      )}
    </Transition>
  );
};

export default Overlay;
