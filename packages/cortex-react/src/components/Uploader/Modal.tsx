import React from 'react';
import { MdClose } from 'react-icons/md';
import { button } from '@tecsinapse/cortex-core';
import { Modal as ModalCortex } from '../Modal';
import { createPortal } from 'react-dom';
import { ModalProps } from './types';

export const Modal = ({
  open,
  onClose,
  children,
  title = 'File Upload',
}: ModalProps) => {
  return createPortal(
    <ModalCortex
      open={open}
      onClose={onClose}
      className={
        'flex flex-col bg-secondary-xlight rounded-mili min-w-[70vw] max-w-[95vh] max-h-[95vh] overflow-auto'
      }
    >
      <div className="flex w-full items-center justify-between mb-deca">
        <div />
        <h2 className="text-deca font-semibold">{title}</h2>
        <button
          className={button({ size: 'square' })}
          onClick={onClose}
          data-testid="close-button"
        >
          <MdClose size={20} />
        </button>
      </div>
      {children}
    </ModalCortex>,
    document.body
  );
};
