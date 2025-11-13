import React from 'react';

import { RootUploaderProps } from './types';
import { Modal } from './Modal';
import { Dropzone } from './Dropzone';
import { Manager } from './Manager';

export const Root = <T,>({
  open,
  onClose,
  dropzoneProps,
  selectFileText,
  dropText,
  buttonText,
  titleModal,
}: RootUploaderProps<T>) => {
  return (
    <>
      <Modal onClose={onClose} open={open} title={titleModal}>
        <div className="flex flex-1 flex-col w-full gap-deca md:flex-row">
          <Dropzone
            dropzoneProps={dropzoneProps}
            selectFileText={selectFileText}
            dropText={dropText}
            buttonText={buttonText}
          />
        </div>
      </Modal>
    </>
  );
};
