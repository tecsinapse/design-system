import React from 'react';
import { FaRegFileLines } from 'react-icons/fa6';
import { button } from '@tecsinapse/cortex-core';
import { ProgressBarInfinite } from './ProgressBarInfinite';

interface FileUploadListProps {
  files: { file: File; loading: 'loading' | 'success' | 'error' }[];
  removeFile: (index: number) => void;
}

export const FileUploadList = ({ files, removeFile }: FileUploadListProps) => {
  return (
    <div className="bg-white w-full border-2 p-deca flex flex-col overflow-y-auto rounded-mili">
      <div className="flex gap-mili items-center mb-deca">
        <div className="flex items-center justify-center w-deca h-deca bg-primary-medium rounded-full text-micro text-white">
          {`${files.length}`}
        </div>
        <h2 className="text-md font-semibold">Upload(s) em progresso</h2>
      </div>

      {files.map((fileItem, index) => (
        <div className="flex flex-col" key={index}>
          <div className="flex items-center justify-between border rounded-t-mili shadow p-mili">
            <div className="flex gap-centi">
              {fileItem.file instanceof File &&
              fileItem.file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(fileItem.file)}
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
                  {fileItem.file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(fileItem.file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            {fileItem.loading === 'success' && (
              <button
                onClick={() => removeFile(index)}
                data-testid="remove-button"
                className={button({
                  className:
                    ' bg-inherit border-2 border-primary-light text-primary-light',
                  size: 'small',
                })}
              >
                ✕
              </button>
            )}
          </div>

          <ProgressBarInfinite isLoading={fileItem.loading} />
        </div>
      ))}
    </div>
  );
};
