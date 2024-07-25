import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { Button, Card } from '../src';

export default {
  title: 'Cortex/Card',
  component: Card,
} as Meta<typeof Card>;

export const Default: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card>
        <div className={'w-[300px]'}>
          <p className={'text-h5 font-bold'}>Exemple card</p>
          <div className={'flex flex-row items-center gap-x-deca mt-deca'}>
            <Button variants={{ variant: 'outline', size: 'small' }}>
              <IoMdArrowForward />
            </Button>
            <p className={''}>Exemple description card</p>
          </div>
        </div>
      </Card>
    );
  },
};
