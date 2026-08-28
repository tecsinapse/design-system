import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FiTrash } from 'react-icons/fi';
import { IoMdArrowForward } from 'react-icons/io';
import { Button, Card } from '../src';

export default {
  title: 'Cortex/Card',
  component: Card,
} as Meta<typeof Card>;

export const Default: StoryObj<typeof Card> = {
  args: {
    children: (
      <div className={'w-[300px]'}>
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
    return <Card>{args.children}</Card>;
  },
};

export const Selectable: StoryObj<typeof Card> = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <div className="w-80">
        <Card
          variants={{ selectable: true, isSelected }}
          className="flex items-center justify-between"
          onClick={() => setIsSelected(isSelected => !isSelected)}
        >
          My Selectable Card
          <FiTrash
            className="cursor-pointer hover:text-primary-medium transition-all duration-300 text-deca"
            onClick={e => {
              e.stopPropagation();
              // handle remove
            }}
          />
        </Card>
      </div>
    );
  },
};
