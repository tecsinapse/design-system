import { useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import {
  AcceptSpecificMap,
  DropzoneProps,
  FileStatus,
  type FileUpload,
} from '../components/Uploader/types';

enum AcceptEnum {
  IMAGE = 'image/*',
  APPLICATION = 'application/octet-stream',
  TEXT = 'text/*',
  VIDEO = 'video/*',
}

interface UseFileUploadOptions<T> {
  acceptTypes?: Array<keyof typeof AcceptEnum>;
  onAccept?: (files: FileUpload<T>[]) => Promise<FileUpload<T>[]>;
  maxSize?: number;
  minSize?: number;
  allowMultiple?: boolean;
  // onDelete: (file: T) => Promise<boolean>;
}

export const useFileUpload = <T>({
  acceptTypes = ['IMAGE', 'APPLICATION', 'TEXT', 'VIDEO'],
  onAccept,
  maxSize,
  minSize,
  allowMultiple = true,
  // onDelete,
}: UseFileUploadOptions<T>) => {
  const [files, setFiles] = useState<FileUpload<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const newFiles: FileUpload<T>[] = acceptedFiles.map(file => ({
      file,
      status: onAccept ? FileStatus.UPLOADING : FileStatus.SUCCESS,
      uid: uuidv4(),
    }));

    const map = new Map();
    for (const i of newFiles) {
      map.set(i.uid, i);
    }

    try {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      if (onAccept) {
        const updatedFiles = await onAccept(newFiles);
        setFiles(prevFiles => {
          const current = new Map();
          for (const i of [...prevFiles, ...updatedFiles]) {
            current.set(i.uid, i);
          }
          return [...current.values()];
        });
      }
    } catch (e) {
      setFiles(prevFiles => {
        const current = new Map();

        const updatedFiles = newFiles.map(f => ({
          ...f,
          status: FileStatus.ERROR,
        }));
        for (const i of [...prevFiles, ...updatedFiles]) {
          current.set(i.uid, i);
        }
        return [...current.values()];
      });
    }
  };

  const mappedAccept: Accept = acceptTypes.reduce((acc, type) => {
    const specificTypes = AcceptSpecificMap[
      type as keyof typeof AcceptSpecificMap
    ] || [AcceptEnum[type as keyof typeof AcceptEnum]] || [type];
    specificTypes.forEach(specificType => {
      if (specificType) acc[specificType] = [];
    });
    return acc;
  }, {} as Accept);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: mappedAccept,
    multiple: allowMultiple,
    maxSize,
    minSize,
  });

  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    // onDelete(files[index]);
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
