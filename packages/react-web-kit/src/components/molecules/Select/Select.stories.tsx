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
  return (
    <Container>
      <ContainerSelect>
        <Select
          {...args}
          type="single"
          value=""
          //@ts-ignore
          onSelect={() => {}}
          labelExtractor={item => item.label}
          keyExtractor={item => String(item.value)}
          onSearch={() => {}}
        />
      </ContainerSelect>
    </Container>
  );
};

export const Base = Template.bind({});

Base.args = {
  placeholder: 'Placeholder do select',
  options: OPTIONS_EXAMPLE,
  hideSearchBar: false,
};

const TemplateSingle: Story<SelectProps<any, any>> = args => {
  const [singleValue, setSingleValue] = useState<string | undefined>('');

  const handleSelectSingleValue = (key: string | undefined) =>
    setSingleValue(key);

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
          //@ts-ignore
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
  options: OPTIONS_EXAMPLE,
  hideSearchBar: false,
};

const TemplateMulti: Story<SelectProps<any, any>> = args => {
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const handleSelectMultipleValues = (keys: string[]) => setMultiValue(keys);

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
          //@ts-ignore
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
