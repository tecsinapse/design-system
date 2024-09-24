import React from 'react';
import { FileUploadItem } from './FileUpload';
import { FileUploadListProps } from './types';

export const FileUploadList = ({
  files,
  removeFile,
  uploadProgressText = 'Upload(s) in progress',
}: FileUploadListProps) => {
  return (
    <div className="bg-white w-full border-2 p-deca flex flex-col overflow-y-auto rounded-mili">
      <div className="flex gap-mili items-center mb-deca">
        <div className="flex items-center justify-center w-deca h-deca bg-primary-medium rounded-full text-micro text-white">
          {`${files.length}`}
        </div>
        <h2 className="text-md font-semibold">{uploadProgressText}</h2>
      </div>

      {files.map((fileItem, index) => (
        <FileUploadItem
          key={index}
          fileItem={fileItem}
          index={index}
          removeFile={removeFile}
        />
      ))}
    </div>
  );
};
