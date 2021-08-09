import { Story } from '@storybook/react';
import React from 'react';

import { default as Select, Option } from './Select';
import styled from '@emotion/styled';

export default {
  title: 'Components/Select',
  component: Select,
};

const OPTIONS_EXAMPLE: Option[] = [
  { label: 'Ryan', value: 'ryan' },
  { label: 'Carlos', value: 'carlos' },
  { label: 'Arruda', value: 'arruda' },
  { label: 'Correa', value: 'correa' },
];

const Template: Story = () => {
  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg);
  }, []);

  return (
    <Container>
      <Select
        options={OPTIONS_EXAMPLE}
        label="Label do select"
        onSearch={handleSearch}
      />
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
