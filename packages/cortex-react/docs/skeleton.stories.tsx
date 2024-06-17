import React from 'react';
import { StoryFn } from '@storybook/react';
import { Card, Skeleton } from '../src';

export default {
  title: 'Cortex/Skeleton',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <Card className={'w-[20rem] gap-y-mili flex flex-col'}>
      <Skeleton className={'rounded-pill w-[2.5rem] h-[2.5rem]'} />
      <Skeleton className={'w-full h-[0.625rem] rounded-mili'} />
      <div className={'flex gap-x-deca'}>
        <Skeleton className={'w-full h-[0.625rem] rounded-mili'} />
        <Skeleton className={'w-full h-[0.625rem] rounded-mili'} />
      </div>
      <Skeleton className={'w-full h-[0.625rem] rounded-mili'} />
    </Card>
  );
};

export const Base = {
  render: Template,
  args: {},
};
