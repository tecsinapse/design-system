import React from 'react';
import { Story } from '@storybook/react';
import { Tag, TagProps } from './index';
import { IconProps } from '@tecsinapse/react-core';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    backgrounds: {
      default: 'white'
    }
  }
};

const Template: Story<TagProps> = (
  { value, icon, variant, dismiss, onDismiss }
) => (
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
  onDismiss: () => alert('Dismiss')
} as TagProps;
