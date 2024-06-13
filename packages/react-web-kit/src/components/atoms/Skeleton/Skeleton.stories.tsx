import React from 'react';
import { StoryFn } from '@storybook/react';
import Skeleton, { SkeletonProps } from './Skeleton';
import { Card, Text } from '../../../';

export default {
  title: 'react-web-kit/Skeleton',
  component: Skeleton,
};

export const Base = {
  args: { width: 100, height: 50 },
};

const ChildrenTemplate: StoryFn<SkeletonProps> = args => {
  return (
    <Skeleton {...args}>
      <Card
        elevated
        style={{
          height: '100px',
          width: '200px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Skeleton card!</Text>
      </Card>
    </Skeleton>
  );
};

export const Children = {
  render: ChildrenTemplate,
  args: { animation: 'pulse' },
};
