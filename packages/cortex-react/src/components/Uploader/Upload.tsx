import { button } from '@tecsinapse/cortex-core';
import { useEffect, useMemo } from 'react';
import { FaRegFileLines, FaRegFolder } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { FileProps, FolderListProps, FolderProps } from './types';

const recursiveCountFolderElements = (node: Record<string, {}>): number => {
  let count = 0;
  for (const key in node) {
    count++;
    count += recursiveCountFolderElements(node[key]);
  }
  return count;
};

const prettyPrintTree = (tree: Record<string, {}>, indent = ''): string => {
  let output = '';
  const entries = Object.entries(tree);
  entries.forEach(([name, children], index) => {
    const isLast = index === entries.length - 1;
    output += `${indent}${isLast ? '└── ' : '├── '}${name}\n`;
    const childIndent = indent + (isLast ? '    ' : '│   ');
    output += prettyPrintTree(children, childIndent);
  });
  return output;
};

const countFolderElements = (paths: string[], root: string): number => {
  if (!paths.length) return 0;

  const tree: Record<string, {}> = {};

  for (const path of paths) {
    const parts = path
      .replace(root + '/', '')
      .split('/')
      .filter(Boolean);
    let current = tree;
    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  }

  return recursiveCountFolderElements(tree);
};

export const File = <T,>({
  file,
  index,
  onDelete,
  showDelete = true,
}: FileProps<T>) => {
  function statusIntent(status: 'success' | 'error' | 'uploading') {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  }

  const formatFileSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
  };

  return (
    <div className="flex flex-col w-full" key={index}>
      <div className="flex items-center justify-between border rounded-t-mili shadow p-mili">
        <div className="flex gap-centi">
          {file.file && file.file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file.file)}
              alt="Preview"
              className="w-tera h-tera rounded-mili"
            />
          ) : (
            <span className="border-2 text-kilo text-primary-medium w-tera h-tera flex items-center justify-center rounded-mili">
              <FaRegFileLines />
            </span>
          )}
          <div className="flex-col">
            <p className="font-semibold truncate max-w-[200px]">
              {file.file.name}
            </p>
            <p className="text-sm text-gray-500">
              {formatFileSize(file.file.size)}
            </p>
          </div>
        </div>
        {file.status === 'success' && showDelete ? (
          <button
            onClick={() => onDelete?.(index)}
            data-testid="remove-button"
            className={button({
              className:
                ' bg-inherit border-2 border-primary-light text-primary-light',
              size: 'small',
            })}
          >
            <MdClose size={15} />
          </button>
        ) : null}
      </div>

      <ProgressBar
        intent={statusIntent(file.status)}
        infinite={file.status === 'uploading'}
      />
    </div>
  );
};

export const Folder = ({ name, subItems }: FolderProps) => {
  const size = useMemo(
    () =>
      countFolderElements(
        subItems.map(it => it.path),
        name
      ),
    [subItems, name]
  );
  const loading = useMemo(
    () => subItems.some(it => it.status === 'uploading'),
    [subItems]
  );
  const intent = useMemo(() => {
    if (loading) return 'info';
    if (
      (subItems ?? []).some(item => item.status === 'error') &&
      (subItems ?? []).some(item => item.status === 'success')
    ) {
      return 'warning';
    }
    return 'success';
  }, [subItems]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between border rounded-t-mili shadow p-mili">
        <div className="flex gap-centi">
          <span className="border-2 text-kilo text-primary-medium w-tera h-tera flex items-center justify-center rounded-mili">
            <FaRegFolder />
          </span>
          <div className="flex-col">
            <p className="font-semibold truncate max-w-[200px]">{name}</p>
            <p className="text-sm text-gray-500">
              {size} {size > 1 ? 'itens' : 'item'}
            </p>
          </div>
        </div>
      </div>

      <ProgressBar intent={intent} infinite={loading} />
    </div>
  );
};

export const FolderList = <T,>({ files, setFolders }: FolderListProps<T>) => {
  const folders: Record<string, { status: string; path: string }[]> =
    useMemo(() => {
      const segments: Record<string, { status: string; path: string }[]> = {};
      files.forEach(file => {
        const path = file.file.relativePath.replace(/^\//, '');
        const root = path.split('/')[0];
        const current = Array.from(segments?.[root] ?? []);
        segments[root] = [...current, { path: path, status: file.status }];
      });
      return segments;
    }, [files]);
  useEffect(() => setFolders(Object.entries(folders)), [folders, setFolders]);
  return (
    <>
      {Object.entries(folders).map(([name, children], index) => (
        <Folder name={name} subItems={children} key={index} />
      ))}
    </>
  );
};
