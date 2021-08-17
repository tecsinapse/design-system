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
  { label: 'Label 1', value: 'value1' },
  { label: 'Label 2', value: 'value2' },
  { label: 'Label 3', value: 'value3' },
  { label: 'Label 4', value: 'value4' },
  { label: 'Label 5', value: 'value5' },
  { label: 'Label 6', value: 'value6' },
];

const TemplateSingle: Story<SelectProps<Option, 'single'>> = args => {
  const [singleValue, setSingleValue] = useState('');

  const handleSelectSingleValue = key => setSingleValue(key);

  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg);
  }, []);

  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          value={singleValue}
          type="single"
          onSelect={handleSelectSingleValue}
          labelExtractor={item => item.label}
          keyExtractor={item => String(item.value)}
          onSearch={handleSearch}
        />
      </ContainerSelect>
    </Container>
  );
};

export const Single = TemplateSingle.bind({});

Single.args = {
  placeholder: 'Placeholder do select',
  label: 'Label',
  options: OPTIONS_EXAMPLE,
  hideSearchBar: false,
};

const TemplateMulti: Story<SelectProps<Option, 'multi'>> = args => {
  const [multiValue, setMultiValue] = useState([]);

  const handleSelectMultipleValues = keys => setMultiValue(keys);

  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg);
  }, []);

  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          value={multiValue}
          type="multi"
          onSelect={handleSelectMultipleValues}
          labelExtractor={item => item.label}
          keyExtractor={item => String(item.value)}
          onSearch={handleSearch}
        />
      </ContainerSelect>
    </Container>
  );
};

export const Multi = TemplateMulti.bind({});

Multi.args = {
  placeholder: 'Placeholder do select',
  label: 'Label',
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
  display: flex;
  width: 400px;
`;
