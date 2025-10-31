import { useMemo, useState } from 'react';
import { FileUpload } from '../components';

export const useManager = <T>({ files }: { files: FileUpload<T>[] }) => {
  const [min, setMin] = useState(false);
  const folderFiles = useMemo(
    () => files.filter(file => file.isFolder),
    [files]
  );
  const regularFiles = useMemo(
    () => files.filter(file => !file.isFolder),
    [files]
  );
  return {
    min,
    setMin,
    folderFiles,
    regularFiles,
  };
};
