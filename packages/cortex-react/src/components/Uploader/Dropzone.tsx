import React from 'react';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { DropzoneProps } from './types';
import { button } from '@tecsinapse/cortex-core';
import clsx from 'clsx';
import { Tooltip } from '../Tooltip';

export const Dropzone = ({
  dropzoneProps,
  selectFileText = 'Select a file to start',
  dropText = 'By dragging and dropping it here or clicking the button below',
  buttonText = 'Select File',
  hasButton = true,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive, isFileLimitReached } =
    dropzoneProps;

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'bg-surface-overlay w-full border-dashed border-2 p-deca flex flex-col justify-center rounded-mili overflow-auto h-[18rem]',
        {
          'border-success-medium bg-gray-100': isDragActive,
        }
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center text-center items-center">
        <div>
          <HiOutlineCloudArrowUp
            className="text-primary-medium mb-nano"
            size={35}
          />
          <p className="text-lg font-semibold" data-testid="select-dropzone">
            {selectFileText}
          </p>
        </div>
        {hasButton ? (
          <div className="flex flex-col items-center gap-centi">
            <p className="text-sm text-secondary-medium">{dropText}</p>
            {isFileLimitReached ? (
              <Tooltip text="Você só pode selecionar um único arquivo.">
                <button
                  disabled
                  className={clsx(button(), 'cursor-not-allowed')}
                >
                  {buttonText}
                </button>
              </Tooltip>
            ) : (
              <button className={button()}>{buttonText}</button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
