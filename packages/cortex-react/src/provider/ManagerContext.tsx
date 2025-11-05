import { createContext, ReactNode, useContext, useState } from 'react';
import { Manager } from '../components/Uploader/Manager';
import { FileUpload, ManagerProps } from '../components';

interface ManagerContextProps<T> {
  showManager: (props: ManagerProps<unknown>) => void;
  files: FileUpload<T>[];
  setFiles: React.Dispatch<React.SetStateAction<FileUpload<unknown>[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManagerContext = createContext<ManagerContextProps<unknown> | null>(null);

export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [props, setProps] = useState<ManagerProps<unknown>>({});
  const [files, setFiles] = useState<FileUpload<unknown>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const showManager = <T,>(_props: ManagerProps<T>) => {
    setProps(_props);
  };

  return (
    <ManagerContext.Provider
      value={{ showManager, files, setFiles, isOpen, setIsOpen }}
    >
      {children}
      <Manager {...props} />
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
