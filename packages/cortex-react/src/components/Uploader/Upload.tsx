import { button } from '@tecsinapse/cortex-core';
import React from 'react';
import { FaRegFileLines, FaRegFolder } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';
import { ProgressBar, ProgressBarProps } from '../ProgressBar/ProgressBar';
import { FileProps, FileUpload, FolderListProps, FolderProps } from './types';

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
              {(file.file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        {file.status === 'success' && showDelete ? (
          <button
            onClick={() => onDelete(index)}
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

export const Folder = <T,>({ name, size, intent, loading }: FolderProps) => {
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

export const FolderList = <T,>({ files }: FolderListProps<T>) => {
  const paths: Set<string> = new Set();
  const buildTree = (files: FileUpload<T>[]) => {
    const root = {
      type: 'root',
      children: new Map(),
    };

    for (const file of files) {
      const parts: string[] = (file.file as any).relativePath
        .slice(1)
        .split('/');

      parts.map(item => paths.add(item));

      let current = root;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;

        if (isLast) {
          current.children.set(part, {
            type: 'file',
            file: file,
          });
        } else {
          if (!current.children.has(part)) {
            current.children.set(part, {
              type: 'folder',
              children: new Map(),
            });
          }
          current = current.children.get(part);
        }
      });
    }

    return root;
  };
  const tree = buildTree(files);
  const count = (node: {
    children: Map<any, any>;
  }): { total: number; files: any[] } => {
    let total = 0;
    const files = [];
    for (const child of node.children.values()) {
      if (child.type === 'file') {
        total += 1;
        files.push(child.file);
      } else if (child.type === 'folder') {
        total += 1;
        const nested = count(child);
        total += nested.total;
        files.push(...nested.files);
      }
    }
    return { total, files };
  };
  const children = [];
  for (const [name, node] of tree.children) {
    const size = count(node).total;
    const files = count(node).files;
    children.push({
      name,
      size,
      files,
    });
  }
  const folders = children.map(folder => {
    const intent: 'default' | 'success' | 'warning' | 'info' | 'error' = (
      folder.files ?? []
    ).some(item => item.status === 'success')
      ? 'success'
      : (files ?? []).some(item => item.status === 'error')
        ? 'error'
        : 'info';
    return { ...folder, intent };
  });

  return (
    <>
      {folders.map(({ intent, name, size, files }, index) => (
        <Folder
          name={name}
          size={size}
          intent={intent}
          loading={files.some(
            (file: FileUpload<T>) => file.status === 'uploading'
          )}
          key={index}
        />
      ))}
    </>
  );
};
