import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

export interface FileItem {
  file: File;
  loading: 'loading' | 'success' | 'error';
}

export interface FileUploadItemProps<T> {
  fileItem: FileUpload<T>;
  index: number;
  removeFile: (index: number) => void;
}

export interface FileUploadListProps<T> {
  files: FileUpload<T>[];
  removeFile: (index: number) => void;
  uploadProgressText?: string;
}

export interface DropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
}

export interface FileDropzoneProps {
  dropzoneProps: DropzoneProps;
  button: () => string;
  selectFileText?: string;
  dropText?: string;
  buttonText?: string;
}

export enum FileStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  UPLOADING = 'uploading',
}

export type FileUpload<T> = {
  file: File;
  metadata?: T;
  // progress?: number;
  uid: string;
  status: FileStatus;
};

export interface FileUploadModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  files: FileUpload<T>[];
  removeFile: (index: number) => void;
  dropzoneProps: DropzoneProps;
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
  ],
  IMAGE: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ],
  VIDEO: [
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/webm',
    'video/ogg',
    'video/x-flv',
  ],
  AUDIO: [
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/x-aac',
    'audio/flac',
    'audio/mp4',
    'audio/aac',
    'audio/webm',
  ],
  TEXT: [
    'text/plain',
    'text/csv',
    'text/html',
    'text/css',
    'text/xml',
    'text/javascript',
    'text/markdown',
  ],
};
