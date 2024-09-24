import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

export interface FileItem {
  file: File;
  loading: 'loading' | 'success' | 'error';
}

export interface FileUploadItemProps {
  fileItem: FileItem;
  index: number;
  removeFile: (index: number) => void;
}

export interface FileUploadListProps {
  files: FileItem[];
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

export interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  removeFile: (index: number) => void;
  dropzoneProps: DropzoneProps;
  selectFileText?: string;
  dropText?: string;
  buttonText?: string;
  uploadProgressText?: string;
  titleModal?: string;
}
