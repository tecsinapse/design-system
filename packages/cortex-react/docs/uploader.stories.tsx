import { Meta, StoryObj } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';
import { useFileUpload } from '../src/hooks';
import React from 'react';
import { Uploader } from '../src';

export default {
  title: 'Cortex/Uploader',
  component: Uploader,
} as Meta<typeof Uploader>;

export const Default: StoryObj<typeof Uploader> = {
  render: args => {
    const { files, openModal, closeModal, deleteFile, dropzoneProps, isOpen } =
      useFileUpload();
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
