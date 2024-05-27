import React from 'react';
import { StoryFn } from '@storybook/react';
import { styleInputElement, styleLabelElement, toggle } from '../src';

export default {
  title: 'Cortex/Toggle',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div>
      <label className={styleLabelElement()}>
        <input type="checkbox" className={styleInputElement()} />
        <div className={toggle()} />
      </label>
    </div>
  );
};

export const Base = {
  render: Template,
  args: {},
};
