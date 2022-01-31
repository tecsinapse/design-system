import React from 'react';
import { Story } from '@storybook/react';
import { Text } from '@tecsinapse/react-core';
import Modal, { ModalProps } from './Modal';
import { Button } from '../Button';

export default {
  title: 'Web/Modal',
  component: Modal,
};

const Template: Story<ModalProps> = ({ open: _open, ...args }) => {
  const [open, setOpen] = React.useState(_open);

  React.useEffect(() => setOpen(_open), [_open]);

  const toggleOpen = () => setOpen(state => !state);

  return (
    <>
      <Modal {...args} onClose={toggleOpen} open={open}>
        <div
          style={{
            width: 350,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text colorVariant="primary" typography="h3" colorTone="dark">
            Are you sure?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis
            lorem sed felis pretium posuere quis ut quam. Nunc at mi quis urna
            maximus feugiat id et neque. Nunc sit amet leo magna. Quisque eu
            risus interdum, sagittis neque nec, ultrices ex.
          </Text>
          <Button onPress={toggleOpen}>
            <Text fontColor="light">Close Modal</Text>
          </Button>
        </div>
      </Modal>
      <Button onPress={toggleOpen}>
        <Text fontColor="light">Open Modal</Text>
      </Button>
    </>
  );
};

export const Base = Template.bind({});

Base.args = { open: true };
