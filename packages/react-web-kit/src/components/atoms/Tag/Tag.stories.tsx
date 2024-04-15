import { Story } from '@storybook/react';
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

const Template: Story<TagProps> = ({
  value,
  icon,
  variant,
  dismiss,
  onDismiss,
  backgroundColorTone,
  backgroundColorVariant
}) => (
  <Tag
    value={value}
    icon={icon}
    variant={variant}
    dismiss={dismiss}
    onDismiss={onDismiss}
  />
);

export const Base = Template.bind({});

Base.args = {
  value: 'Label',
  icon: { name: 'stopwatch', type: 'fontisto' } as IconProps,
  variant: 'small',
  dismiss: true,
  onDismiss: () => alert('Dismiss'),
  backgroundColorTone: 'secondary',
  backgroundColorVariant: 'xlight'
} as TagProps;
