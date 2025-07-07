import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../src';

export default {
  title: 'Cortex/Progress Bar',
  component: ProgressBar,
  argTypes: {
    value: {
      description: 'Valor da barra de progresso (0 a 100)',
    },
  },
} as Meta<typeof ProgressBar>;

export const Default: StoryObj<typeof ProgressBar> = {
  args: {
    value: 75,
    intent: 'default',
    infinite: false,
  },
  render: args => (
    <div className={'w-[500px]'}>
      <ProgressBar
        value={args.value}
        intent={args.intent}
        infinite={args.infinite}
      />
    </div>
  ),
};
