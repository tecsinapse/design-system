import { useMemo, useState } from 'react';
import { FileUpload } from '../components';

export const useManagerHelpers = <T>({
  files,
}: {
  files?: FileUpload<T>[];
}) => {
  const [min, setMin] = useState(false);
  const [folders, setFolders] =
    useState<[string, { status: string; path: string }[]][]>();
  const folderFiles = useMemo(
    () => files?.filter(file => file.isFolder) ?? [],
    [files]
  );
  const regularFiles = useMemo(
    () => files?.filter(file => !file.isFolder) ?? [],
    [files]
  );
  const totalLength = (regularFiles ?? []).length + (folders ?? []).length;
  const isLoading = useMemo(
    () => files?.some(file => file.status === 'uploading'),
    [files]
  );
  return {
    min,
    setMin,
    folderFiles,
    regularFiles,
    totalLength,
    setFolders,
    isLoading,
  };
};
