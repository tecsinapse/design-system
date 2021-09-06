import React from 'react';
import { Story } from '@storybook/react';
import Skeleton from './Skeleton';
import { SkeletonProps } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
};

const Template: Story<SkeletonProps> = args => <Skeleton {...args} />;

export const Base = Template.bind({});

Base.args = { width: 100, height: 50 };
