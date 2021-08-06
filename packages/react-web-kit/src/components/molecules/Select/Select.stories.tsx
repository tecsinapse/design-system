import { Story } from '@storybook/react';
import React from 'react';

import { default as Select, Option } from './Select';
import styled from '@emotion/styled';

export default {
  title: 'Components/Select',
  component: Select,
};

const OPTIONS_EXAMPLE: Option[] = [
  { label: 'Ryan', value: 'ryan', fontColor: 'dark' },
  { label: 'Carlos', value: 'ryan', fontColor: 'orange' },
  { label: 'Arruda', value: 'ryan', fontColor: 'medium' },
  { label: 'Correa', value: 'ryan', fontColor: 'dark' },
];

const Template: Story = () => {
  return (
    <Container>
      <Select options={OPTIONS_EXAMPLE} />
    </Container>
  );
};

export const Base = Template.bind({});

const Container = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
