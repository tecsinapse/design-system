import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DropzoneProps, FileItem } from '../components/Uploader/types';

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/*': [],
      'text/*': [],
      'video/*': [],
    },
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
