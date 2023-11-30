import React from 'react';
import { StoryFn } from '@storybook/react';
import { tag } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Tag',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className={tag()}>
      <p>Tag</p>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
