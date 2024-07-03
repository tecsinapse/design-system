import React from 'react';
import { StoryFn } from '@storybook/react';
import { button } from '../../cortex-core/src';
import Popover from '../src/components/Popover';

export default {
  title: 'Cortex/Popover',
  component: Popover, 
  argTypes: {
    position: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    trigger: {
      options: ['hover', 'click'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: { exclude: ['children', 'content', 'placement', 'variants'] },
  },
};

type Position = 'bottom' | 'top' | 'left' | 'right';
type Trigger = 'hover' | 'click';

interface Test {
  position: Position;
  trigger: Trigger;
}

const Template: StoryFn<Test> = (args) => {
  return (
    <div className="h-[150px] mt-deca">
      <Popover
        content={
          <div className="p-4">
            <h3 className="text-lg font-bold">Título do Popover</h3>
            <p className="mt-2 text-sm text-gray-600">
              Este é o conteúdo detalhado do Popover. Você pode adicionar mais informações aqui.
            </p>
            <button className={button({ intent: 'secondary', className: 'mt-4' })}>Ação</button>
          </div>
        }
        trigger={args.trigger}
        placement={args.position}
      >
        <button className={button({ intent: 'primary' })}>Teste popover</button>
      </Popover>
    </div>
  );
};

export const Base = Template.bind({});
Base.args = {
  position: 'bottom',
};
