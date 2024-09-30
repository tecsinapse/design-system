import { Meta, StoryObj } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';
import React from 'react';
import { Uploader } from '../src';
import { FileStatus, type FileUpload } from '../src/components/Uploader/types';
import { useFileUpload } from '../src/hooks';

export default {
  title: 'Cortex/Uploader',
  component: Uploader,
} as Meta<typeof Uploader>;

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
    const { files, openModal, closeModal, deleteFile, dropzoneProps, isOpen } =
      useFileUpload<{ id: string }>({
        acceptTypes: ['IMAGE', 'VIDEO'],
        onAccept,
      });
    console.log(files);
    return (
      <div>
        <button className={button()} onClick={openModal}>
          Upload File
        </button>
        <Uploader
          isOpen={isOpen}
          onClose={closeModal}
          files={files}
          removeFile={deleteFile}
          dropzoneProps={dropzoneProps}
        />
      </div>
    );
  },
};
