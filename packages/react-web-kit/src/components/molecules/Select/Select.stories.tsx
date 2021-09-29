import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { default as Select, SelectProps } from './Select';
import styled from '@emotion/styled';

export default {
  title: 'Web/Select',
  component: Select,
};

type Option = {
  label: string;
  value: string;
};

const OPTIONS_EXAMPLE: Option[] = [
  { label: 'New York', value: 'value1' },
  { label: 'São Paulo', value: 'value2' },
  { label: 'Lisbon', value: 'value3' },
  { label: 'Moscow', value: 'value4' },
  { label: 'Sidney', value: 'value5' },
  { label: 'Rio de Janeiro', value: 'value6' },
];

const TemplateSingle: Story<SelectProps<Option, 'single'>> = ({
  options: _options,
  ...args
}) => {
  const [singleValue, setSingleValue] = useState(undefined);
  const [options, setOptions] = useState(_options);

  const handleSelectSingleValue = React.useCallback(
    key => setSingleValue(key),
    [setSingleValue]
  );

  const labelExtractor = React.useCallback(item => item.label, []);
  const keyExtractor = React.useCallback(item => String(item.value), []);

  const handleSearch = React.useCallback((searchArg: string) => {
    setOptions(
      _options.filter(item => new RegExp(searchArg, 'ig').test(item.label))
    );
  }, []);

  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          options={options}
          value={singleValue}
          type="single"
          onSelect={handleSelectSingleValue}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
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

  const handleSelectMultipleValues = React.useCallback(
    keys => setMultiValue(keys),
    [setMultiValue]
  );

  const labelExtractor = React.useCallback(item => item.label, []);
  const keyExtractor = React.useCallback(item => String(item.value), []);

  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          value={multiValue}
          type="multi"
          onSelect={handleSelectMultipleValues}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
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
