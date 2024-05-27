import { StoryFn } from '@storybook/react';
import { IconProps } from '@tecsinapse/react-core';
import React from 'react';
import { Tag, TagProps } from './index';

export default {
  title: 'Hybrid/Tag',
  component: Tag,
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
};

const Template: StoryFn<TagProps> = ({
  value,
  icon,
  variant,
  dismiss,
  onDismiss,
  backgroundColorTone,
  backgroundColorVariant,
}) => (
  <Tag
    value={value}
    icon={icon}
    variant={variant}
    dismiss={dismiss}
    onDismiss={onDismiss}
    backgroundColorTone={backgroundColorTone}
    backgroundColorVariant={backgroundColorVariant}
  />
);

export const Base = {
  render: Template,

  args: {
    value: 'Label',
    icon: { name: 'stopwatch', type: 'fontisto' } as IconProps,
    variant: 'small',
    dismiss: true,
    onDismiss: () => alert('Dismiss'),
    backgroundColorTone: 'secondary',
    backgroundColorVariant: 'xlight',
  } as TagProps,
};
