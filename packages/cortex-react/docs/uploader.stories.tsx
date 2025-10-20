import { Meta, StoryObj } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';
import React from 'react';
import { Button, Uploader } from '../src';
import { FileStatus, type FileUpload } from '../src/components/Uploader/types';
import { useFileUpload } from '../src/hooks';
import { Manager } from '../src/components/Uploader/Manager';

export default {
  title: 'Cortex/Uploader',
  component: Uploader.Root,
  subcomponents: {
    Modal: Uploader.Modal,
    Files: Uploader.Files,
    Dropzone: Uploader.Dropzone,
  },
} as Meta<typeof Uploader.Root>;

const onAccept = async <T,>(
  files: FileUpload<T>[]
): Promise<FileUpload<T>[]> => {
  const stepTime = 1_000;

  const promises = files.map(
    (_, idx) =>
      new Promise<T>((res, rej) => {
        setTimeout(
          () => {
            if (idx % 2 !== 0) rej(undefined);
            return res({ id: String(idx) } as T);
          },
          stepTime * (idx + 1)
        );
      })
  );

  const metadata = await Promise.allSettled<T>(promises);

  return metadata.map((i, idx) =>
    i.status === 'fulfilled'
      ? { ...files[idx], metadata: i.value, status: FileStatus.SUCCESS }
      : { ...files[idx], status: FileStatus.ERROR }
  );
};

export const Default: StoryObj<typeof Uploader> = {
  render: args => {
    const {
      files,
      onOpen,
      onClose,
      onDelete,
      dropzoneProps,
      open,
      isManagerOpen,
      closeManager,
    } = useFileUpload<{ id: string }>({
      accept: {
        APPLICATION: [],
        AUDIO: [],
        IMAGE: [],
        VIDEO: ['video/mp4'],
      },
      onAccept,
    });

    return (
      <div>
        <button className={button()} onClick={onOpen}>
          Upload File
        </button>
        <Uploader.Root
          open={open}
          onClose={onClose}
          dropzoneProps={dropzoneProps}
          files={files}
          onDelete={onDelete}
          isManagerOpen={isManagerOpen}
          closeManager={closeManager}
        />
      </div>
    );
  },
};

export const Custom: StoryObj<typeof Uploader> = {
  render: args => {
    const { files, onOpen, onClose, onDelete, dropzoneProps, open } =
      useFileUpload<{ id: string }>({
        accept: {
          APPLICATION: [],
          AUDIO: [],
          VIDEO: ['video/mp4'],
        },
        onAccept,
      });

    return (
      <div>
        <button className={button()} onClick={onOpen}>
          Upload File Custom
        </button>
        <Uploader.Modal open={open} onClose={onClose}>
          <div className="flex flex-col overflow-y-auto w-full gap-kilo">
            <div className="flex flex-row flex-1 gap-kilo">
              <Uploader.Dropzone dropzoneProps={dropzoneProps} />
              <Uploader.Files files={files} onDelete={onDelete} />
            </div>
            <Button type="button" variants={{ className: 'mb-deca' }}>
              Teste
            </Button>
          </div>
        </Uploader.Modal>
      </div>
    );
  },
};
