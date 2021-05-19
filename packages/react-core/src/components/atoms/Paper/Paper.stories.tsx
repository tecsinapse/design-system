import React from 'react';
import { Story } from '@storybook/react';
import styled from '@emotion/native';
import Paper, { PaperProps } from './Paper';

const StyledPaper = styled(Paper)`
  width: 250px;
  height: 100px;
  background-color: #fff;
`;

export default {
  title: 'Components/Paper',
  component: Paper,
};

const Template: Story<PaperProps> = args => {
  return <StyledPaper {...args} />;
};

export const Base = Template.bind({});

Base.args = {
  elevated: true,
};
