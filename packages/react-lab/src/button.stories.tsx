import React from 'react';
import { StoryFn } from '@storybook/react';
import { button } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Button',
  component: <button />,
};

const Template: StoryFn = () => {
  return (
    <button
      disabled={false}
      className={button({ intent: 'primary', variant: '' })}
      onClick={() => console.debug('CLICK')}
    >
      Button
    </button>
  );
};

export const Base = Template.bind({});

Base.args = {};
