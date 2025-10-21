import { tv } from 'tailwind-variants';
import { createPortal } from 'react-dom';
import { File } from './Upload';
import { Button } from '../Button';
import { IoMdClose } from 'react-icons/io';
import { ManagerProps } from './types';

const foldermodal = tv({
  base: 'fixed rounded-micro p-kilo bg-white shadow-xl flex transition bottom-deca right-deca z-modal',
  variants: {
    open: {
      true: 'scale-100 visible',
      false: 'invisible',
    },
  },
});

export const Manager = <T,>({
  open,
  files,
  onDelete,
  uploadProgressText = 'Upload(s) in progress',
  onClose,
}: ManagerProps<T>) => {
  return createPortal(
    <div
      className={foldermodal({
        className: 'h-auto max-h-[350px] w-[450px] overflow-hidden pt-deca',
        open,
      })}
    >
      <div className="flex flex-col w-full h-full gap-mili items-center">
        <div className="flex items-center justify-between w-full">
          <div />
          <h3 className="ml-mega" data-testid="upload-progress">
            {uploadProgressText}
          </h3>
          <Button
            variants={{ variant: 'filled', size: 'square' }}
            onClick={onClose}
          >
            <IoMdClose />
          </Button>
        </div>
        <div className="flex flex-col w-full overflow-scroll h-auto max-h-[300px] pb-kilo px-deca">
          {files.map((file, index) => (
            <File
              file={file}
              key={file.uid}
              index={index}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};
