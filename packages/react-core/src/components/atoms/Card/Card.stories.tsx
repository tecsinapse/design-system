import React from 'react';
import { Story } from '@storybook/react';
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
  title: 'Components/Card',
  component: Card,
};

const Template: Story<CardProps> = ({ elevated, ...rest }) => (
  <StyledCard elevated={elevated} {...rest} />
);

export const Base = Template.bind({});

Base.args = {
  elevated: true,
  onPress: e => action('onClick')(e),
};
