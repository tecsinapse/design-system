import React from 'react';
import { button } from '@tecsinapse/cortex-core';
import { FileDropzone } from './FileDropzone';
import { FileUploadList } from './FileUploadList';
import { ModalUpload } from './ModalUpload';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: { file: File; loading: 'loading' | 'success' | 'error' }[];
  removeFile: (index: number) => void;
  dropzoneProps: any;
}

export const Uploader = ({
  isOpen,
  onClose,
  files,
  removeFile,
  dropzoneProps,
}: FileUploadModalProps) => {
  return (
    <ModalUpload onClose={onClose} isOpen={isOpen}>
      <FileDropzone dropzoneProps={dropzoneProps} button={button} />
      <FileUploadList files={files} removeFile={removeFile} />
    </ModalUpload>
  );
};
