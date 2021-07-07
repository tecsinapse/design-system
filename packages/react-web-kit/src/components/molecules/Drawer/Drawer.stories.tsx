import { Story } from '@storybook/react';
import React from 'react';
import { Drawer } from '../Drawer/';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = () => {
  return <Drawer expanded={false} />;
};

export const Base = Template.bind({});

// @ts-ignore
Base.args = {};
