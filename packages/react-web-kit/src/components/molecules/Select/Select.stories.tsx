import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { default as Select, SelectProps } from './Select';
import styled from '@emotion/styled';

export default {
  title: 'Components/Select',
  component: Select,
};

type Option = {
  label: string;
  value: string;
};

const OPTIONS_EXAMPLE: Option[] = [
  { label: 'Ryan', value: 'ryan' },
  { label: 'Carlos', value: 'carlos' },
  { label: 'Arruda', value: 'arruda' },
  { label: 'Correa', value: 'correa' },
];

const Template: Story<SelectProps<any, any>> = args => {
  const [value, setValues] = useState<string[]>([]);
  function handleSelectMultipleValues(keys: string[]) {
    setValues(keys);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg);
  }, []);

  return (
    <Container>
      <Select
        {...args}
        value={value}
        //@ts-ignore
        onSelect={handleSelectMultipleValues}
        labelExtractor={item => item.label}
        keyExtractor={item => String(item.value)}
        onSearch={handleSearch}
      />
    </Container>
  );
};

export const Base = Template.bind({});

Base.args = {
  placeholder: 'Placeholder do select',
  type: 'multi',
  options: OPTIONS_EXAMPLE,
  hideSearchBar: false,
};

const Container = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
