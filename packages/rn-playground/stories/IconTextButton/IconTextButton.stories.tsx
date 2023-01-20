import { IconTextButton } from '@tecsinapse/react-native-kit';
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof IconTextButton> = {
  title: 'IconTextButton',
  component: IconTextButton,
  args: {
    variant: 'filled',
    size: 'default',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof IconTextButton>;
export const Base = (args: IStory) => (
  <IconTextButton
    {...args}
    iconProps={{
      name: 'rocket',
      type: 'font-awesome',
    }}
  />
);

export const Labeled = (args: IStory) => (
  <IconTextButton
    {...args}
    iconProps={{
      name: 'rocket',
      type: 'font-awesome',
    }}
    label={'Rocket Icon!'}
  />
);
