import React from 'react';
import { FaRegFileLines } from 'react-icons/fa6';
import { button } from '@tecsinapse/cortex-core';
import { FileProps } from './types';
import { MdClose } from 'react-icons/md';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export const File = <T,>({ file, index, onDelete }: FileProps<T>) => {
  return (
    <div className="flex flex-col" key={index}>
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
        {file.status === 'success' && (
          <button
            onClick={() => onDelete(index)}
            data-testid="remove-button"
            className={button({
              className:
                ' bg-inherit border-2 border-primary-light text-primary-light',
              size: 'small',
            })}
          >
            <MdClose size={20} />
          </button>
        )}
      </div>

      <ProgressBar intent={'info'} infinite={file.status !== 'success'} />
    </div>
  );
};
