import React from 'react';
import { MdClose } from 'react-icons/md';
import { button } from '@tecsinapse/cortex-core';
import { Modal } from '../Modal';
import { createPortal } from 'react-dom';
interface ModalUploadProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalUpload = ({
  isOpen,
  onClose,
  children,
}: ModalUploadProps) => {
  return createPortal(
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex-col w-[70%] h-[50%] bg-secondary-xlight rounded-mili"
    >
      <div className="flex w-full items-center justify-between mb-deca">
        <div />
        <h2 className="text-deca font-semibold">Upload de arquivos</h2>
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
    </Modal>,
    document.body
  );
};
