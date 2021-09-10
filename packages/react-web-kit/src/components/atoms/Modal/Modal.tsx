import React, { CSSProperties } from 'react';
import { Transition } from 'react-transition-group';
import { Overlay } from '../Overlay';
import { ModalContainer } from './styled';
import { defaultStyleOverlay, transitionStylesOverlay } from './animations';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  style?: CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose, style }) => {
  return (
    <>
      <Overlay open={open} onClose={onClose} zIndex="modal" />
      <Transition in={open} timeout={400}>
        {state => (
          <ModalContainer
            style={{
              ...style,
              ...defaultStyleOverlay,
              ...transitionStylesOverlay[state],
            }}
          >
            {children}
          </ModalContainer>
        )}
      </Transition>
    </>
  );
};

export default Modal;
