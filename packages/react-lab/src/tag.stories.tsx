import React from 'react';
import { Story } from '@storybook/react';
import { tag } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Tag',
  component: <div />,
};

const Template: Story = () => {
  return (
    <div className={tag({ intent: '' })}>
      <p className={''}>Tag</p>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
