import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Overlay } from '../Overlay';
import { ModalContainer } from './styled';
import { defaultStyleOverlay, transitionStylesOverlay } from './animations';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onClose,
  style,
  ...rest
}) => {
  const transitionRef = useRef(null);
  return (
    <>
      <Overlay open={open} onClose={onClose} zIndex="modal" />
      <Transition in={open} timeout={400} nodeRef={transitionRef}>
        {state => (
          <ModalContainer
            ref={transitionRef}
            style={{
              ...style,
              ...defaultStyleOverlay,
              ...transitionStylesOverlay[state],
            }}
            {...rest}
          >
            {children}
          </ModalContainer>
        )}
      </Transition>
    </>
  );
};

export default Modal;
