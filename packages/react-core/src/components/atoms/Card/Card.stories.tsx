import React from 'react';
import { StoryFn } from '@storybook/react';
import styled from '@emotion/native';
import { action } from '@storybook/addon-actions';
import Card, { CardProps } from './Card';
import { StyleProps } from '../../../types/defaults';

const StyledCard = styled(Card)<Partial<StyleProps>>`
  border-color: ${({ theme }) => theme.color.secondary.light};
  border-width: ${({ theme }) => theme.borderWidth.pico};
  width: 250px;
  height: 100px;
`;

export default {
  title: 'react-web-kit/Card',
  component: Card,
};

const Template: StoryFn<CardProps> = ({ elevated, ...rest }) => (
  <StyledCard elevated={elevated} {...rest} />
);

export const Base = {
  render: Template,

  args: {
    elevated: true,
    onPress: e => action('onClick')(e),
  },
};
