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
  { label: 'Correa', value: '12' },
  { label: 'Correa', value: 'cor23rea' },
  { label: 'Correa', value: 'cor55rea' },
];

const Template: Story<SelectProps<any, any>> = args => {
  const [value, setValues] = useState<string[] | string>(
    args.type === 'multi' ? [] : ''
  );

  const handleValues = (key: string[] | string) => setValues(key);

  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg);
  }, []);
  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          value={value}
          onSelect={handleValues}
          labelExtractor={item => item.label}
          keyExtractor={item => String(item.value)}
          onSearch={handleSearch}
        />
      </ContainerSelect>
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

const ContainerSelect = styled('div')`
  min-width: 400px;
`;
