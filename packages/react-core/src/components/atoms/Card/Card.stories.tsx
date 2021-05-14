import { Story } from '@storybook/react';
import React from 'react';
import { Card } from './index';
import { Text } from './../Text/index';
import { spacings, typography } from '../../../styles/definitions';
import styled from '@emotion/native';
import { Header } from './Header/index';
import { Footer } from './Footer/index';
import { View } from 'react-native';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template: Story = () => (
  <Card>
    <View>
      <Header>
        <TextTitle>Title</TextTitle>
      </Header>
      <TextInfo>
        Description Description Description Description Description Description
        Description
      </TextInfo>
      <Footer>
        <TextFooter>Footer</TextFooter>
      </Footer>
    </View>
  </Card>
);

const TextTitle = styled(Text)`
  ${typography.headings.h1};
  color: black;
`;

const TextInfo = styled(Text)`
  padding-top: ${spacings.micro};
  padding-left: ${spacings.micro};
  ${typography.text.base};
  color: black;
`;

const TextFooter = styled(Text)`
  padding-left: ${spacings.micro};
  padding-top: ${spacings.centi};
`;
export const Base = Template.bind({});
