import { StoryFn } from '@storybook/react';
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

const TemplateSingle: StoryFn<SelectProps<Option, 'single'>> = ({
  options: _options,
  ...args
}) => {
  const [singleValue, setSingleValue] = useState(undefined);
  const [options, setOptions] = useState(_options as Option[]);

  const handleSelectSingleValue = React.useCallback(
    key => setSingleValue(key),
    [setSingleValue]
  );

  const labelExtractor = React.useCallback(item => item.label, []);
  const keyExtractor = React.useCallback(item => String(item.value), []);

  const handleSearch = React.useCallback((searchArg: string) => {
    setOptions(
      (_options as Option[]).filter(item =>
        new RegExp(searchArg, 'ig').test(item.label)
      )
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

export const Single = {
  render: TemplateSingle,

  args: {
    placeholder: 'Placeholder do select',
    label: 'Label',
    options: OPTIONS_EXAMPLE,
    hideSearchBar: false,
  },
};

const TemplateMulti: StoryFn<SelectProps<Option, 'multi'>> = ({
  options: _options,
  ...args
}) => {
  const [multiValue, setMultiValue] = useState([]);
  const [options, setOptions] = useState(_options as Option[]);

  const handleSelectMultipleValues = React.useCallback(
    keys => setMultiValue(keys),
    [setMultiValue]
  );

  const labelExtractor = React.useCallback(item => item.label, []);
  const keyExtractor = React.useCallback(item => String(item.value), []);

  const handleSearch = React.useCallback((searchArg: string) => {
    setOptions(
      (_options as Option[]).filter(item =>
        new RegExp(searchArg, 'ig').test(item.label)
      )
    );
  }, []);

  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          options={options}
          value={multiValue}
          type="multi"
          onSelect={handleSelectMultipleValues}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
          onSearch={handleSearch}
        />
      </ContainerSelect>
    </Container>
  );
};

export const Multi = {
  render: TemplateMulti,

  args: {
    placeholder: 'Placeholder do select',
    label: 'Label',
    options: OPTIONS_EXAMPLE,
    hideSearchBar: false,
  },
};

const TemplateMultiLazy: StoryFn<SelectProps<Option, 'multi'>> = ({
  options: _options,
  ...args
}) => {
  const fetchUsers = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    }).then(data => data.json());
  };

  const fetchPromise: (
    searchInput: string | undefined
  ) => Promise<{ value: string; label: string }[]> = React.useCallback(
    async (searchInput: string | undefined) => {
      const dataTest = await fetchUsers();
      return (dataTest || [])
        .map(item => ({
          value: item.id,
          label: item.name,
        }))
        .filter(value => {
          if (searchInput) return value.label.includes(searchInput);
          else return true;
        });
    },
    []
  );

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
          options={fetchPromise}
          value={multiValue}
          type="multi"
          onSelect={handleSelectMultipleValues}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
          onSearch={fetchPromise}
        />
      </ContainerSelect>
    </Container>
  );
};

export const Lazy = {
  render: TemplateMultiLazy,

  args: {
    placeholder: 'Placeholder do select',
    label: 'Label',
    hideSearchBar: false,
  },
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
