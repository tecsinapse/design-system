import React from 'react';
import { StoryFn } from '@storybook/react';
import { badge, containerBadge } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Badge',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className={containerBadge()}>
      <div
        className={'rounded-full w-10 h-10 bg-info-light border border-black'}
      ></div>
      <div
        className={badge({
          intent: 'error',
        })}
      >
        5
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
