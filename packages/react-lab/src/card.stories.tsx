import React from 'react';
import { StoryFn } from '@storybook/react';
import { button, card, tag } from '@tecsinapse/cortex-core/src/components';

export default {
  title: 'Lab/Card',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div
      className={card({
        className: 'w-[300px]',
      })}
    >
      <div className={'flex justify-between items-center'}>
        <div>
          <div className={tag({ intent: 'primary' })}>Text Tag</div>
          <p className={'text-h5 font-bold'}>Title card</p>
          <p className="text-base">Description card</p>
        </div>
        <button className={button({ intent: 'primary', variant: 'outline' })}>
          Access
        </button>
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
