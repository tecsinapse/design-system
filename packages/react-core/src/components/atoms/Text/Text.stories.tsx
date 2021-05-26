import { Story } from '@storybook/react';
import React from 'react';
import { Text, TextProps } from './index';

export default {
  title: 'Components/Text',
  component: Text,
};

const Template: Story<TextProps> = ({
  colorVariant,
  fontWeight,
  typography,
}) => (
  <Text
    colorVariant={colorVariant}
    fontWeight={fontWeight}
    typography={typography}
  >
    Text
  </Text>
);

export const Base = Template.bind({});

Base.args = {
  colorVariant: 'dark',
  fontWeight: 'regular',
  typography: 'h3',
};
