import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

export interface FileItem {
  file: File;
  loading: 'loading' | 'success' | 'error';
}

export interface FileProps<T> {
  file: FileUpload<T>;
  index: number;
  onDelete: (index: number) => void;
}

export interface FilesProps<T> {
  files: FileUpload<T>[];
  onDelete: (index: number) => void;
  uploadProgressText?: string;
}

export interface UseDropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  hasMultipleFile: boolean;
}

export interface DropzoneProps {
  dropzoneProps: UseDropzoneProps;
  selectFileText?: string;
  dropText?: string;
  buttonText?: string;
  hasMultipleFile?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export enum FileStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export type FileUpload<T> = {
  file: File;
  metadata?: T;
  uid: string;
  status: 'success' | 'error' | 'uploading';
};

export interface RootUploaderProps<T> {
  open: boolean;
  onClose: () => void;
  files: FileUpload<T>[];
  onDelete: (index: number) => void;
  dropzoneProps: UseDropzoneProps;
  selectFileText?: string;
  dropText?: string;
  buttonText?: string;
  uploadProgressText?: string;
  titleModal?: string;
}

export const AcceptSpecificMap = {
  APPLICATION: [
    'application/pdf',
    'application/zip',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/json',
    'application/xml',
    'application/rtf',
    'application/x-tar',
    'application/x-httpd-php',
    'application/octet-stream',
  ] as const,
  IMAGE: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ] as const,
  VIDEO: [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/webm',
    'video/ogg',
    'video/x-flv',
  ] as const,
  AUDIO: [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/x-aac',
    'audio/flac',
    'audio/mp4',
    'audio/aac',
    'audio/webm',
  ] as const,
  TEXT: [
    'text/plain',
    'text/csv',
    'text/html',
    'text/css',
    'text/xml',
    'text/javascript',
    'text/markdown',
  ] as const,
} as const;
