import { useState, useCallback } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { DropzoneProps, FileItem } from '../components/Uploader/types';

enum AcceptEnum {
  IMAGE = 'image/*',
  APPLICATION = 'application/*',
  TEXT = 'text/*',
  VIDEO = 'video/*',
}

interface UseFileUploadOptions {
  acceptTypes?: Array<keyof typeof AcceptEnum>;
}

export const useFileUpload = ({
  acceptTypes = ['IMAGE', 'APPLICATION', 'TEXT', 'VIDEO'],
}: UseFileUploadOptions = {}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const updateFileStatus = (index: number, status: 'success' | 'error') => {
    setFiles(prevFiles =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, loading: status } : file
      )
    );
  };

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      loading: 'loading' as const,
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);

    newFiles.forEach((_, index) => {
      const fileIndex = files.length + index;
      setTimeout(() => {
        try {
          updateFileStatus(fileIndex, 'success');
        } catch (error) {
          updateFileStatus(fileIndex, 'error');
          console.error(error);
        }
      }, 2000);
    });
  };

  const mappedAccept: Accept = acceptTypes.reduce((acc, type) => {
    const mimeType = AcceptEnum[type];
    if (mimeType) {
      acc[mimeType] = [];
    }
    return acc;
  }, {} as Accept);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mappedAccept,
    multiple: true,
  });

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  return {
    openModal,
    closeModal,
    deleteFile: handleRemoveFile,
    dropzoneProps: {
      getInputProps,
      getRootProps,
      isDragActive,
    } as DropzoneProps,
    isOpen,
    files,
  };
};
