import { Story } from '@storybook/react';
import React from 'react';
import Card from './Card';
import styled from '@emotion/native';

const StyledCard = styled(Card)`
  width: 250px;
  height: 100px;
`;

export default {
  title: 'Components/Card',
  component: Card,
};

const Template: Story = ({ elevated }) => <StyledCard elevated={elevated} />;

export const Base = Template.bind({});

Base.args = {
  elevated: true,
};
