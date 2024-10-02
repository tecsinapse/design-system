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
      className="flex-col w-[70%] h-[50%] bg-secondary-xlight rounded-mili"
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
      <div className="flex flex-col md:flex-row w-full h-full max-h-[85%] gap-deca">
        {children}
      </div>
    </ModalCortex>,
    document.body
  );
};
