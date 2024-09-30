import React from 'react';
import { button } from '@tecsinapse/cortex-core';
import { FileDropzone } from './FileDropzone';
import { FileUploadList } from './FileUploadList';
import { ModalUpload } from './ModalUpload';
import { FileUploadModalProps } from './types';

export const Uploader = <T,>({
  isOpen,
  onClose,
  files,
  removeFile,
  dropzoneProps,
  selectFileText,
  dropText,
  buttonText,
  uploadProgressText,
  titleModal,
}: FileUploadModalProps<T>) => {
  return (
    <ModalUpload onClose={onClose} isOpen={isOpen} titleModal={titleModal}>
      <FileDropzone
        dropzoneProps={dropzoneProps}
        button={button}
        selectFileText={selectFileText}
        dropText={dropText}
        buttonText={buttonText}
      />
      <FileUploadList
        files={files}
        removeFile={removeFile}
        uploadProgressText={uploadProgressText}
      />
    </ModalUpload>
  );
};
