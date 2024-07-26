import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { Modal } from '../src';

export default {
  title: 'Cortex/Modal',
  component: Modal,
} as Meta<typeof Modal>;

export const Default: StoryObj<typeof Modal> = {
  args: {
    open: true,
  },
  render: args => (
    <div className="w-[90vw] h-[500px]">
      <Modal open={args.open} onClose={() => console.log('onClose')}>
        <div className={'w-[400px]'}>
          <div className={'justify-between flex flex-row'}>
            <p className={'font-black text-h3'}>What is Lorem Ipsum?</p>
            <MdClose
              className={
                'text-primary-medium text-deca cursor-pointer hover:text-primary-dark'
              }
              onClick={() => console.log('onClose')}
            />
          </div>
          <p className={'mt-giga'}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </Modal>
    </div>
  ),
};
