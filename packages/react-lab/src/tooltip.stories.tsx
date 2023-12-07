import React from 'react';
import { StoryFn } from '@storybook/react';
import { button, tooltip, tooltipContainer } from '@tecsinapse/cortex-core';

export default {
  title: 'Lab/Tooltip',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <>
      <div className={tooltipContainer()}>
        <button className={button({ intent: 'primary' })}>Teste Tooltip</button>
        <span
          id={'spanTest'}
          className={tooltip({
            position: 'top',
            className: `w-[400px]`,
          })}
        >
          Text text Text text Text text Text text Text text Text text Text text
          Text text Text text
        </span>
      </div>
    </>
  );
};

export const Base = Template.bind({});

Base.args = {};
