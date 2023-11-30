import React from 'react';
import { StoryFn } from '@storybook/react';
import { button, drawer, overlay } from '@tecsinapse/cortex-core';
export default {
  title: 'Lab/Drawer',
  component: <div />,
};

const Template: StoryFn = () => {
  return (
    <div className="flex">
      <input type="checkbox" id="drawer-toggle" className="sr-only peer" />
      <label htmlFor={'drawer-toggle'}>
        <div
          className={button({
            intent: 'primary',
            className: 'flex justify-center items-center',
          })}
        >
          <p>Abrir/fechar drawer</p>
        </div>
      </label>
      <label className={overlay()}></label>
      <div className={drawer()}>
        <div className={'w-72'}>Conteúdo drawer</div>
      </div>
    </div>
  );
};

export const Base = Template.bind({});

Base.args = {};
