import { modal, overlay } from '@tecsinapse/cortex-core';
import { ReactNode, forwardRef, type DialogHTMLAttributes } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** child element */
  children?: ReactNode;
}

/** Modal component */
export const Modal = forwardRef<
  HTMLDialogElement,
  ModalProps & DialogHTMLAttributes<HTMLDialogElement>
>((props, ref) => {
  const { open, onClose, children, className, ...rest } = props;
  return (
    <>
      <div
        data-testid="overlay"
        className={overlay({ show: open })}
        onClick={onClose}
      />
      <dialog
        {...rest}
        ref={ref}
        data-testid="modal"
        className={modal({ open, className })}
      >
        {children}
      </dialog>
    </>
  );
});
