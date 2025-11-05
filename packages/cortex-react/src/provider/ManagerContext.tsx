import { createContext, ReactNode, useContext, useState } from 'react';
import { Manager } from '../components/Uploader/Manager';
import { ManagerProps } from '../components';

interface ManagerContextProps {
  showManager: (props: ManagerProps<unknown>) => void;
}

const ManagerContext = createContext<ManagerContextProps | null>(null);

export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [props, setProps] = useState<ManagerProps<unknown>>({});

  const showManager = <T,>(_props: ManagerProps<T>) => {
    setProps(_props);
  };

  return (
    <ManagerContext.Provider value={{ showManager }}>
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
