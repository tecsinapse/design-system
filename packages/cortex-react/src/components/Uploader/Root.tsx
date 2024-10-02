import React from 'react';

import { RootProps } from './types';
import { Modal } from './Modal';
import { Dropzone } from './Dropzone';
import { Files } from './Files';

export const Root = <T,>({
  open,
  onClose,
  files,
  onDelete,
  dropzoneProps,
  selectFileText,
  dropText,
  buttonText,
  uploadProgressText,
  titleModal,
}: RootProps<T>) => {
  return (
    <Modal onClose={onClose} open={open} title={titleModal}>
      <Dropzone
        dropzoneProps={dropzoneProps}
        selectFileText={selectFileText}
        dropText={dropText}
        buttonText={buttonText}
      />
      <Files
        files={files}
        onDelete={onDelete}
        uploadProgressText={uploadProgressText}
      />
    </Modal>
  );
};
