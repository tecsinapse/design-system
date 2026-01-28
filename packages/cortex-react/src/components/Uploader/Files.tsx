import React from 'react';
import { File } from './Upload';
import { FilesProps } from './types';

export const Files = <T,>({
  files,
  onDelete,
  uploadProgressText = 'Upload(s) in progress',
}: FilesProps<T>) => {
  return (
    <div className="bg-white w-full border-2 p-deca flex flex-col overflow-y-auto rounded-mili h-[18rem]">
      <div className="flex gap-mili items-center mb-deca">
        <div className="flex items-center justify-center w-deca h-deca bg-primary-medium rounded-full text-micro text-on-primary">
          {`${files.length}`}
        </div>
        <h2 className="text-md font-semibold" data-testid="upload-progress">
          {uploadProgressText}
        </h2>
      </div>

      {files.map((file, index) => (
        <File key={file.uid} file={file} index={index} onDelete={onDelete} />
      ))}
    </div>
  );
};
