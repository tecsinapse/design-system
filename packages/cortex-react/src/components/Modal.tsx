import { modal, overlay } from '@tecsinapse/cortex-core';
import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** child element */
  children?: ReactNode;
}

/** Modal component */
export const Modal = forwardRef<
  HTMLDivElement,
  ModalProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { open, onClose, children, className } = props;
  return (
    <div ref={ref} {...props}>
      <div
        data-testid="overlay"
        className={overlay({ show: open })}
        onClick={onClose}
      />
      <dialog data-testid="modal" className={modal({ open, className })}>
        {children}
      </dialog>
    </div>
  );
});
