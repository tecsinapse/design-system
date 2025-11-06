import { useCallback, useEffect, useState } from 'react';
import {
  Accept,
  useDropzone,
  type DropEvent,
  type FileRejection,
} from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import {
  AcceptSpecificMap,
  FileStatus,
  UseDropzoneProps,
  type FileUpload,
} from '../components/Uploader/types';
import { useManager } from '../provider';

interface UseFileUploadOptions<T> {
  accept?: {
    IMAGE?: (typeof AcceptSpecificMap.IMAGE)[number][];
    APPLICATION?: (typeof AcceptSpecificMap.APPLICATION)[number][];
    AUDIO?: (typeof AcceptSpecificMap.AUDIO)[number][];
    VIDEO?: (typeof AcceptSpecificMap.VIDEO)[number][];
    TEXT?: (typeof AcceptSpecificMap.TEXT)[number][];
  };
  onAccept?: (files: FileUpload<T>[]) => Promise<FileUpload<T>[]>;
  onFileRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
  maxSize?: number;
  allowMultiple?: boolean;
  preventDuplicates?: boolean;
  onDuplicate?: (duplicates: File[]) => void;
  hasManager?: boolean;
  isFolder?: boolean;
  uploadProgressText?: string;
}

export const useFileUpload = <T>({
  accept = {},
  onAccept,
  onFileRejected,
  maxSize,
  allowMultiple = true,
  preventDuplicates = false,
  onDuplicate,
  hasManager = true,
  isFolder = false,
  uploadProgressText,
}: UseFileUploadOptions<T>) => {
  const {
    showManager,
    files,
    setFiles,
    isOpen: isManagerOpen,
    setIsOpen: setIsManagerOpen,
    uploadFiles,
  } = useManager();
  const [duplicates, setDuplicates] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  }, []);

  const handleClearFiles = useCallback(() => {
    setFiles([]);
  }, []);

  const openManager = useCallback(() => setIsManagerOpen(true), []);
  const closeManager = useCallback(() => {
    handleClearFiles();
    setIsManagerOpen(false);
  }, []);

  const updateFiles = useCallback(
    (prevFiles: FileUpload<unknown>[], newFiles: FileUpload<unknown>[]) => {
      const current = new Map<string, FileUpload<unknown>>();
      [...prevFiles, ...newFiles].forEach(file => current.set(file.uid, file));
      return [...current.values()];
    },
    []
  );

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (hasManager) {
      openManager();
      onClose();
    }
    let toProcess = acceptedFiles;

    if (preventDuplicates) {
      const found = (acceptedFiles ?? []).filter(file =>
        files.some(existing => existing.file.name === file.name)
      );
      if (found.length > 0) {
        setDuplicates(found);
        onDuplicate?.(found);
      }

      toProcess = acceptedFiles.filter(
        file => !found.some(dup => dup.name === file.name)
      );
      if (toProcess.length === 0) return;
    }

    const newFiles: FileUpload<T>[] = toProcess.map(file => ({
      file,
      status: onAccept ? FileStatus.UPLOADING : FileStatus.SUCCESS,
      uid: uuidv4(),
      isFolder,
    }));

    uploadFiles({ onAccept, newFiles, updateFiles });
  };

  useEffect(() => {
    if (hasManager) {
      showManager?.({
        onClose: closeManager,
        onDelete: handleRemoveFile,
        uploadProgressText,
      });
    }
  }, [handleRemoveFile, closeManager]);

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
    onDropRejected: onFileRejected,
  });

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
    openManager,
    closeManager,
    isManagerOpen,
    files,
    duplicates,
    onClearFiles: handleClearFiles,
  };
};
