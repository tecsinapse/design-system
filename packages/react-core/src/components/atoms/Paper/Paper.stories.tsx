import styled from '@emotion/native';
import { Story } from '@storybook/react';
import React from 'react';
import { StyleProps } from '../../../../dist';
import { Paper, PaperProps } from './index';

export default {
  title: 'Components/Paper',
  component: Paper,
};

const Template: Story<PaperProps> = args => {
  return <StyledPaper {...args} />;
};

export const Base = Template.bind({});

const StyledPaper = styled(Paper)<Partial<StyleProps>>`
  border-color: ${({ theme }) => theme.color.secondary.light};
  border-width: ${({ theme }) => theme.borderWidth.pico};
  width: 250px;
  height: 100px;
`

Base.args = {
  elevated: true,
};
