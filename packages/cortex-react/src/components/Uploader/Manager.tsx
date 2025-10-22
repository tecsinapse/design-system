import { createPortal } from 'react-dom';
import { File } from './Upload';
import { Button } from '../Button';
import { IoMdClose } from 'react-icons/io';
import { ManagerProps } from './types';
import { useState } from 'react';
import { clsx } from 'clsx';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { manager } from '@tecsinapse/cortex-core';

export const Manager = <T,>({
  open,
  files,
  onDelete,
  uploadProgressText = 'Upload(s) in progress',
  onClose,
}: ManagerProps<T>) => {
  const [min, setMin] = useState(false);

  return createPortal(
    <div
      className={manager({
        className: 'h-auto max-h-[350px] w-[450px] overflow-hidden',
        open,
      })}
    >
      <div className="flex flex-col w-full h-full gap-mili items-center">
        <div className="flex items-center justify-between w-full">
          <Button
            variants={{ variant: 'text', size: 'square' }}
            onClick={() => setMin(min => !min)}
          >
            {min ? <IoChevronUp /> : <IoChevronDown />}
          </Button>
          <h3 data-testid="upload-progress">{uploadProgressText}</h3>
          <Button
            variants={{ variant: 'filled', size: 'square' }}
            onClick={onClose}
          >
            <IoMdClose />
          </Button>
        </div>
        <div
          className={clsx('w-full h-auto max-h-[300px] gap-mili', {
            hidden: min,
            'flex flex-col': !min,
            'pb-kilo overflow-scroll pr-deca': files.length > 3,
          })}
        >
          {files.map((file, index) => (
            <File
              file={file}
              key={file.uid}
              index={index}
              onDelete={onDelete}
              showDelete={false}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
