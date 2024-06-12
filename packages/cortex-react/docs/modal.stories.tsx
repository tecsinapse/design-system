import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Button, Modal } from '../src';
import { MdClose } from 'react-icons/md';

export default {
  title: 'Cortex/Modal',
  component: Modal,
};

const Template: StoryFn = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <p>Show modal</p>
      </Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className={'w-[600px] h-[80%]'}>
          <div className={'justify-between flex flex-row'}>
            <p className={'font-black text-h3'}>What is Lorem Ipsum?</p>
            <MdClose
              className={
                'text-primary-medium text-deca cursor-pointer hover:text-primary-dark'
              }
              onClick={() => setShowModal(false)}
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
    </>
  );
};

export const Base = {
  render: Template,
  args: {},
};
