import React from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { DropzoneProps } from './types';
import { button } from '@tecsinapse/cortex-core';
import clsx from 'clsx';

export const Dropzone = ({
  dropzoneProps,
  selectFileText = 'Select a file to start',
  dropText = 'By dragging and dropping it here or clicking the button below',
  buttonText = 'Select File',
}: DropzoneProps) => {
  return (
    <div
      {...dropzoneProps.getRootProps()}
      className={clsx(
        'bg-white w-full border-dashed border-2 p-deca flex flex-col justify-center rounded-mili',
        {
          'border-success-medium bg-gray-100': dropzoneProps.isDragActive,
        }
      )}
    >
      <input {...dropzoneProps.getInputProps()} />
      <div className="flex flex-col justify-center text-center items-center gap-deca">
        <HiOutlineCloudArrowUp className="text-primary-medium" size={35} />
        <div className="gap-mili">
          <p className="text-lg font-semibold" data-testid="select-dropzone">
            {selectFileText}
          </p>
          <p className="text-sm text-secondary-medium">{dropText}</p>
        </div>

        <button className={button()}>{buttonText}</button>
      </div>
    </div>
  );
};
