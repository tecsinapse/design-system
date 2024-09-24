import React from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { FileDropzoneProps } from './types';

export const FileDropzone = ({
  dropzoneProps,
  button,
  selectFileText = 'Select a file to start',
  dropText = 'By dragging and dropping it here or clicking the button below',
  buttonText = 'Select File',
}: FileDropzoneProps) => {
  return (
    <div
      {...dropzoneProps.getRootProps()}
      className={`bg-white w-full border-dashed border-2 p-deca flex flex-col justify-center rounded-mili ${
        dropzoneProps.isDragActive ? 'border-success-medium bg-gray-100' : ''
      }`}
    >
      <input {...dropzoneProps.getInputProps()} />
      <div className="flex flex-col justify-center text-center items-center gap-deca">
        <HiOutlineCloudArrowUp className="text-primary-medium" size={35} />
        <div className="gap-mili">
          <p className="text-lg font-semibold ">{selectFileText}</p>
          <p className="text-sm text-gray-500">{dropText}</p>
        </div>

        <button className={button()}>{buttonText}</button>
      </div>
    </div>
  );
};
