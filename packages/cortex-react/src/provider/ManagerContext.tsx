import { createContext, ReactNode, useContext, useState } from 'react';
import { Manager } from '../components/Uploader/Manager';
import { FileStatus, FileUpload, ManagerProps } from '../components';

interface UploadFilesProps<T> {
  onAccept?: (files: FileUpload<T>[]) => Promise<FileUpload<T>[]>;
  newFiles: FileUpload<T>[];
  updateFiles: (
    prevFiles: FileUpload<unknown>[],
    newFiles: FileUpload<T>[]
  ) => FileUpload<T>[];
}

interface ManagerContextProps<T> {
  showManager: (props: ManagerProps<T>) => void;
  files: FileUpload<T>[];
  setFiles: React.Dispatch<React.SetStateAction<FileUpload<T>[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uploadFiles: (props: UploadFilesProps<T>) => void;
}

const ManagerContext = createContext<ManagerContextProps<any> | null>(null);

export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [props, setProps] = useState<ManagerProps<unknown>>({});
  const [files, setFiles] = useState<FileUpload<unknown>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const uploadFiles = async <T,>({
    onAccept,
    newFiles,
    updateFiles,
  }: UploadFilesProps<T>) => {
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

  const showManager = <T,>(_props: ManagerProps<T>) => {
    setProps(_props);
  };

  return (
    <ManagerContext.Provider
      value={{ showManager, files, setFiles, isOpen, setIsOpen, uploadFiles }}
    >
      {children}
      <Manager files={files} open={isOpen} {...props} />
    </ManagerContext.Provider>
  );
};

export const useManager = () => {
  const context = useContext(ManagerContext);

  if (!context) {
    throw new Error('useManager must be used within a ManagerProvider');
  }
  return context;
};
