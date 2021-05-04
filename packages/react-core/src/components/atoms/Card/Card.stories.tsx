import { Story } from '@storybook/react';
import React from 'react';
import { Card } from './index';
import { Text } from './../Text/index';
import { spacings, typography } from '../../styles/definitions';
import styled from '@emotion/native';
import { View } from 'react-native';

export default {
  title: 'Card',
  component: Card,
};

const Template: Story = () => (
  <Card>
    <View>
      <TextTitle>Title</TextTitle>
      <TextInfo>
        Description Description Description Description Description Description
        Description Description
      </TextInfo>
    </View>
  </Card>
);

const TextTitle = styled(Text)`
  ${typography.headings.h1};
  color: black;
`;

const TextInfo = styled(Text)`
  padding-top: ${spacings.mili};
  padding-left: ${spacings.micro};
  ${typography.text.base};
  color: black;
`;
export const Base = Template.bind({});
