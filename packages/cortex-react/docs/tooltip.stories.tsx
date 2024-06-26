import React from 'react';
import { StoryFn } from '@storybook/react';
import { button, tooltip, tooltipContainer } from '../../cortex-core/src';

export default {
  title: 'Cortex/Tooltip',
  component: <div />,
  argTypes: {
    position: {
      options: ['top', 'bottom'],
      control: { type: 'radio' },
    },
  },
};

type Position = 'bottom' | 'top';
interface Test {
  position: Position;
}
const Template: StoryFn<Test> = ({ position }) => {
  return (
    <>
      <div className={tooltipContainer()}>
        <button className={button({ intent: 'primary' })}>Teste Tooltip</button>
        <span
          id={'spanTest'}
          className={tooltip({
            position,
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

export const Base = {
  render: Template,

  args: {
    position: 'top',
  },
};
