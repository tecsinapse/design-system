import styled from '@emotion/native';
import { Story } from '@storybook/react';
import React from 'react';
import { BoxContent, BoxContentProps } from '.';
import { Text } from '../Text';

export default {
  title: 'Components/Box Content',
  component: BoxContent,
};

const Template: Story<BoxContentProps> = ({ ...rest }) => (
  <StyledBoxContent {...rest}>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
    <Text>Some text here!</Text>
  </StyledBoxContent>
);

export const Base = Template.bind({});

Base.args = {
  variant: 'bottom',
};

const StyledBoxContent = styled(BoxContent)`
  align-items: center;
`;
