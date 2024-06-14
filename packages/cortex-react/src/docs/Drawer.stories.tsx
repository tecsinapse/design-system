import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Button, Card, Input } from '../index';
import Drawer from '../components/Drawer';

export default {
  title: 'Cortex-React/Drawer',
  component: <div />,
  argTypes: {},
};

const Template: StoryFn = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>
        <p>Open drawer</p>
      </Button>
      <Drawer open={show} onClose={() => setShow(false)}>
        <div className={'flex justify-between flex-col h-full'}>
          <div>
            <p className={'items-center flex font-bold text-h3'}>
              Title example
            </p>
            <Card className={'mt-deca w-[25rem] flex flex-col gap-y-deca'}>
              <p className={'font-bold'}>Title card</p>
              <Input.Root
                placeholder={'Example input'}
                label={'Example label'}
              />
              <Input.Root
                placeholder={'Example input'}
                label={'Example label'}
              />
              <Input.Root
                placeholder={'Example input'}
                label={'Example label'}
              />
            </Card>
          </div>
          <div className={'flex gap-x-deca'}>
            <Button variants={{ variant: 'outline', className: 'flex-1' }}>
              <p>Cancel</p>
            </Button>
            <Button variants={{ className: 'flex-1' }}>
              <p>Submit</p>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export const Base = {
  render: Template,
};
