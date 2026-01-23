import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { Button, Card } from '../src';

export default {
  title: 'Cortex/Card',
  component: Card,
} as Meta<typeof Card>;

export const Default: StoryObj<typeof Card> = {
  args: {
    children: (
      <div className={'w-[300px] text-default'}>
        <p className={'text-h5 font-bold'}>Exemple card</p>
        <div className={'flex flex-row items-center gap-x-deca mt-deca'}>
          <Button variants={{ variant: 'outline', size: 'small' }}>
            <IoMdArrowForward />
          </Button>
          <p className={''}>Exemple description card</p>
        </div>
      </div>
    ),
  },
  render: args => {
    return (
      <div className="w-[400px] h-[300px] bg-[#0E0E0E] flex justify-center items-center">
        <Card>{args.children}</Card>
      </div>
    );
  },
};
