import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import IconTextButton, { WebIconTextButtonProps } from './IconTextButton';

export default {
  title: 'Hybrid/IconTextButton',
  component: IconTextButton,
};

const TemplateIcon: Story<WebIconTextButtonProps> = args => (
  <IconTextButton {...args} />
);

export const BaseIcon = TemplateIcon.bind({});

BaseIcon.args = {
  onPress: e => action('onPress')(e),
  iconProps: {
    name: 'rocket',
    type: 'font-awesome',
  },
};

const TemplateIconText: Story<WebIconTextButtonProps> = args => (
  <IconTextButton {...args} />
);

export const BaseIconText = TemplateIconText.bind({});

BaseIconText.args = {
  onPress: e => action('onPress')(e),
  variant: 'outlined',
  iconProps: {
    name: 'rocket',
    type: 'font-awesome',
  },
  label: 'Rocket Icon!',
};

const TemplateText: Story<WebIconTextButtonProps> = args => (
  <IconTextButton {...args} />
);

export const BaseText = TemplateText.bind({});

BaseText.args = {
  onPress: e => action('onPress')(e),
  variant: 'text',
  label: 'No rocket icon :(',
};
