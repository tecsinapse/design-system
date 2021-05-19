import { Story } from '@storybook/react';
import React from 'react';
import Card from './Card';
import styled from '@emotion/native';
import { action } from '@storybook/addon-actions';

const StyledCard = styled(Card)`
  width: 250px;
  height: 100px;
  background-color: #fff;
`;

export default {
  title: 'Components/Card',
  component: Card,
};

const Template: Story = ({ elevated, ...rest }) => (
  <StyledCard elevated={elevated} {...rest} />
);

export const Base = Template.bind({});

Base.args = {
  elevated: true,
  onClick: e => action('onClick')(e),
};
