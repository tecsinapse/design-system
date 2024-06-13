import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';
import { Select } from '../src';

export default {
  title: 'Cortex/Select/Grouped',
  component: <div />,
  argTypes: {
    variant: {
      options: ['default', 'error'],
      control: { type: 'select' },
    },
    label: {
      control: { type: 'text' },
    },
    placeholderSearchInput: {
      control: { type: 'text' },
    },
  },
};

const Template: StoryFn = args => {
  const [value, setValue] = useState<{ key: string; label: string }>();

  const estadosECidades = new Map();

  estadosECidades.set('São Paulo', [
    { key: 'SP1', label: 'São Paulo' },
    { key: 'SP2', label: 'Campinas' },
    { key: 'SP3', label: 'Santos' },
  ]);
  estadosECidades.set('Rio de Janeiro', [
    { key: 'RJ1', label: 'Rio de Janeiro' },
    { key: 'RJ2', label: 'Niterói' },
    { key: 'RJ3', label: 'Petrópolis' },
  ]);
  estadosECidades.set('Minas Gerais', [
    { key: 'MG1', label: 'Belo Horizonte' },
    { key: 'MG2', label: 'Uberlândia' },
    { key: 'MG3', label: 'Ouro Preto' },
  ]);
  estadosECidades.set('Bahia', [
    { key: 'BA1', label: 'Salvador' },
    { key: 'BA2', label: 'Feira de Santana' },
    { key: 'BA3', label: 'Ilhéus' },
  ]);
  estadosECidades.set('Paraná', [
    { key: 'PR1', label: 'Curitiba' },
    { key: 'PR2', label: 'Londrina' },
    { key: 'PR3', label: 'Maringá' },
  ]);

  return (
    <div className={'w-[350px]'}>
      <Select
        variant={args.variant}
        label={args.label}
        // onSearch={handleSearch}
        placeholderSearchInput={args.placeholderSearchInput}
        labelExtractor={op => op.label}
        keyExtractor={op => op.key}
        onSelect={setValue}
        value={value}
        grouped={true}
        groupedLabelExtractor={labelGroup => labelGroup}
        options={estadosECidades}
      />
    </div>
  );
};

export const Base = {
  render: Template,
  args: {
    variant: 'default',
    label: 'Label',
    placeholderSearchInput: 'Placeholder Search',
  },
};
