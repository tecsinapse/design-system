import React from 'react';
import { Story } from '@storybook/react';
import Skeleton from './Skeleton';
import { SkeletonProps } from './Skeleton';
import { Text, Card } from '../../../';

export default {
  title: 'Web/Skeleton',
  component: Skeleton,
};

const Template: Story<SkeletonProps> = args => <Skeleton {...args} />;

export const Base = Template.bind({});

Base.args = { width: 100, height: 50 };

const ChildrenTemplate: Story<SkeletonProps> = args => {
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

export const Children = ChildrenTemplate.bind({});

Children.args = { animation: 'pulse' };
