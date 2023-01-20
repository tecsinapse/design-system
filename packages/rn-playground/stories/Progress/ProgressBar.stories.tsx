import React from 'react';
import { ProgressBar } from '@tecsinapse/react-native-kit';

import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof ProgressBar> = {
  title: 'ProgressBar',
  component: ProgressBar,
  args: {
    valueMax: 100,
    valueNow: 50,
    valueMin: 0,
    animate: true,
    animationParameters: { direction: 'right', duration: 3000 },
    color: 'success',
    segments: 4,
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof ProgressBar>;

export const Base = (args: IStory) => {
  const animate = args?.args?.animate ?? true;
  const valueNow = args?.args?.valueNow ?? 50;
  return <ProgressBar animate={animate} valueNow={valueNow} {...args} />;
};
