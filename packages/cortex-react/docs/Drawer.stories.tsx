import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Card, Drawer, Input } from '../src';

export default {
  title: 'Cortex/Drawer',
  component: Drawer,
} as Meta<typeof Drawer>;

export const Default: StoryObj<typeof Drawer> = {
  args: {
    open: true,
    position: 'right',
  },
  render: args => {
    return (
      <div className="w-[80vw] h-[800px]">
        <Drawer
          open={args.open}
          onClose={() => console.log('onClose()')}
          position={args.position}
        >
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
              <Button
                variants={{ variant: 'outline', className: 'flex-1' }}
                onClick={() => console.log('onClose()')}
              >
                <p>Cancel</p>
              </Button>
              <Button variants={{ className: 'flex-1' }}>
                <p>Submit</p>
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};
