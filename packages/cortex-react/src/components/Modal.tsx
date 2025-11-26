import { modal, overlay } from '@tecsinapse/cortex-core';
import { ReactNode, type DialogHTMLAttributes } from 'react';

interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  open: boolean;
  onClose: () => void;
  /** child element */
  children?: ReactNode;
  /** React ref */
  ref?: React.Ref<HTMLDialogElement>;
}

/** Modal component */
export const Modal = (props: ModalProps) => {
  const { open, onClose, children, className, ref, ...rest } = props;
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
};
