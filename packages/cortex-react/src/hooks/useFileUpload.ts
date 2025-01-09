import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import {
  UseDropzoneProps,
  FileStatus,
  AcceptSpecificMap,
  type FileUpload,
} from '../components/Uploader/types';

interface UseFileUploadOptions<T> {
  accept?: {
    IMAGE?: (typeof AcceptSpecificMap.IMAGE)[number][];
    APPLICATION?: (typeof AcceptSpecificMap.APPLICATION)[number][];
    AUDIO?: (typeof AcceptSpecificMap.AUDIO)[number][];
    VIDEO?: (typeof AcceptSpecificMap.VIDEO)[number][];
    TEXT?: (typeof AcceptSpecificMap.TEXT)[number][];
  };
  onAccept?: (files: FileUpload<T>[]) => Promise<FileUpload<T>[]>;
  maxSize?: number;
  allowMultiple?: boolean;
  onDelete?: (file: FileUpload<T>) => Promise<void>;
}

export const useFileUpload = <T>({
  accept = {},
  onAccept,
  maxSize,
  allowMultiple = true,
}: UseFileUploadOptions<T>) => {
  const [files, setFiles] = useState<FileUpload<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const updateFiles = useCallback(
    (prevFiles: FileUpload<T>[], newFiles: FileUpload<T>[]) => {
      const current = new Map<string, FileUpload<T>>();
      [...prevFiles, ...newFiles].forEach(file => current.set(file.uid, file));
      return [...current.values()];
    },
    []
  );

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const newFiles: FileUpload<T>[] = acceptedFiles.map(file => ({
      file,
      status: onAccept ? FileStatus.UPLOADING : FileStatus.SUCCESS,
      uid: uuidv4(),
    }));

    try {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      if (onAccept) {
        const updatedFiles = await onAccept(newFiles);
        setFiles(prevFiles => updateFiles(prevFiles, updatedFiles));
      }
    } catch (e) {
      const updatedFiles = newFiles.map(f => ({
        ...f,
        status: FileStatus.ERROR,
      }));
      setFiles(prevFiles => updateFiles(prevFiles, updatedFiles));
    }
  };

  const addMimeTypes = (key: keyof typeof AcceptSpecificMap, acc: Accept) => {
    AcceptSpecificMap[key].forEach(mimeType => {
      acc[mimeType] = [];
    });
  };

  const mappedAccept: Accept = Object.keys(accept).reduce((acc, key) => {
    const mimeTypes = accept[key as keyof typeof accept];

    if (Array.isArray(mimeTypes) && mimeTypes.length === 0) {
      addMimeTypes(key as keyof typeof AcceptSpecificMap, acc);
    } else if (mimeTypes) {
      mimeTypes.forEach(mimeType => {
        acc[mimeType] = [];
      });
    }

    return acc;
  }, {} as Accept);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mappedAccept,
    multiple: allowMultiple,
    maxSize,
  });

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const isFileLimitReached = !allowMultiple && files.length > 0;

  return {
    onOpen,
    onClose,
    onDelete: handleRemoveFile,
    dropzoneProps: {
      getInputProps,
      getRootProps,
      isDragActive,
      isFileLimitReached,
    } as UseDropzoneProps,
    open: isOpen,
    files,
  };
};
