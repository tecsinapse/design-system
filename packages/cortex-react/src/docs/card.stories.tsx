import React from 'react';
import { StoryFn } from '@storybook/react';
import { Button, Card } from '../index';
import { IoMdArrowForward } from 'react-icons/io';
export default {
  title: 'Cortex-React/Card',
  component: <div />,
};

const Template: StoryFn = () => {
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
};

export const Base = {
  render: Template,
  args: {},
};
