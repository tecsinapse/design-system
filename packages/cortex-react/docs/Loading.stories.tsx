import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Loading } from '../src';

export default {
  title: 'Cortex/Loading',
  component: Loading,
} as Meta<typeof Loading>;

export const Default: StoryObj<typeof Loading> = {
  args: {},
  render: () => <Loading className={'w-8 h-8'} />,
};
