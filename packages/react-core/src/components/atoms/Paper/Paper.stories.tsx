import styled from '@emotion/native';
import { StoryFn } from '@storybook/react-vite';
import React from 'react';
import Paper, { PaperProps } from './Paper';
import { StyleProps } from '../../../types/defaults';

export default {
  title: 'react-core/Paper',
  component: Paper,
};

const Template: StoryFn<PaperProps> = args => {
  return <StyledPaper {...args} />;
};

export const Base = {
  render: Template,

  args: {
    elevated: false,
  },
};

const StyledPaper = styled(Paper)<Partial<StyleProps>>`
  border-color: ${({ theme }) => theme.color.secondary.light};
  border-width: ${({ theme }) => theme.borderWidth.pico};
  width: 250px;
  height: 100px;
`;
