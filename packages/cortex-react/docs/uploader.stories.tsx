import { Meta, StoryObj } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';
import { Button, Uploader } from '../src';
import { FileStatus, type FileUpload } from '../src/components/Uploader/types';
import { useFileUpload } from '../src/hooks';

export default {
  title: 'Cortex/Uploader',
  component: Uploader.Root,
  subcomponents: {
    Modal: Uploader.Modal,
    Files: Uploader.Files,
    Dropzone: Uploader.Dropzone,
    Manager: Uploader.Manager,
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
  render: () => {
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
          uploadProgressText="Upload(s) em progresso"
        />
      </div>
    );
  },
};

export const CustomWithManager: StoryObj<typeof Uploader> = {
  render: () => {
    const {
      files,
      onOpen,
      onClose,
      onDelete,
      dropzoneProps,
      open,
      closeManager,
      isManagerOpen,
    } = useFileUpload<{ id: string }>({
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
          Upload File Custom With Manager
        </button>
        <Uploader.Modal open={open} onClose={onClose}>
          <div className="flex flex-col overflow-y-auto w-full gap-kilo">
            <div className="flex flex-row flex-1 gap-kilo">
              <Uploader.Dropzone dropzoneProps={dropzoneProps} />
            </div>
            <Button type="button" variants={{ className: 'mb-deca' }}>
              Teste
            </Button>
          </div>
        </Uploader.Modal>
        <Uploader.Manager
          files={files}
          onClose={closeManager}
          onDelete={onDelete}
          open={isManagerOpen}
        />
      </div>
    );
  },
};

export const CustomWithoutManager: StoryObj<typeof Uploader> = {
  render: () => {
    const { files, onOpen, onClose, onDelete, dropzoneProps, open } =
      useFileUpload<{ id: string }>({
        accept: {
          APPLICATION: [],
          AUDIO: [],
          VIDEO: ['video/mp4'],
        },
        onAccept,
        hasManager: false,
      });

    return (
      <div>
        <button className={button()} onClick={onOpen}>
          Upload File Custom Without Manager
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
