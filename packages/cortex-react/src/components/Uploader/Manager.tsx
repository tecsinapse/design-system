import { tv } from 'tailwind-variants';
import { createPortal } from 'react-dom';
import { FileUpload } from './types';
import { File } from './Upload';
import { Button } from '../Button';
import { IoMdClose } from 'react-icons/io';

const foldermodal = tv({
  base: 'fixed rounded-micro p-kilo bg-white shadow-xl flex transition z-modal',
  variants: {
    open: {
      true: 'scale-100 visible',
      false: 'invisible',
    },
  },
});

interface ManagerProps<T> {
  open: boolean;
  files: FileUpload<T>[];
  onDelete: (index: number) => void;
  uploadProgressText: string;
  onClose: () => void;
}

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
        className:
          'h-[350px] w-[400px] bg-white bottom-deca right-deca overflow-hidden',
        open,
      })}
    >
      <div className="flex flex-col w-full h-full gap-mili items-center">
        <div className="flex items-center justify-between w-full">
          <div />
          <h3 className="ml-mega">{uploadProgressText}</h3>
          <Button
            variants={{ variant: 'outline', size: 'circle' }}
            onClick={onClose}
          >
            <IoMdClose />
          </Button>
        </div>
        <div className="flex flex-col w-full overflow-scroll">
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
