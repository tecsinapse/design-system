import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Skeleton } from '../src';

export default {
  title: 'Cortex/Skeleton',
  component: Skeleton,
} as Meta<typeof Skeleton>;

export const Example: StoryObj<typeof Skeleton> = {
  render: () => {
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
  },
};
