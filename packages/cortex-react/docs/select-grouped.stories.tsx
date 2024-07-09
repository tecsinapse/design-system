import { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Input, Select } from '../src';

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

const map = new Map([
  ['São Paulo', [
    { key: 'SP1', label: 'São Paulo' },
    { key: 'SP2', label: 'Campinas' },
    { key: 'SP3', label: 'Santos' }
  ]],
  ['Rio de Janeiro', [
    { key: 'RJ1', label: 'Rio de Janeiro' },
    { key: 'RJ2', label: 'Niterói' },
    { key: 'RJ3', label: 'Petrópolis' },
  ]],
  ['Minas Gerais', [
    { key: 'MG1', label: 'Belo Horizonte' },
    { key: 'MG2', label: 'Uberlândia' },
    { key: 'MG3', label: 'Ouro Preto' },
  ]],
  ['Bahia', [
    { key: 'BA1', label: 'Salvador' },
    { key: 'BA2', label: 'Feira de Santana' },
    { key: 'BA3', label: 'Ilhéus' },
  ]],
  ['Paraná', [
    { key: 'PR1', label: 'Curitiba' },
    { key: 'PR2', label: 'Londrina' },
    { key: 'PR3', label: 'Maringá' },
  ]]
]);

const Template: StoryFn = args => {
  const [value, setValue] = useState<{ key: string; label: string }>();
  const [options, setOptions] = useState(map);

  const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const searchArg = event.target.value;
    const newMap = new Map();
    Array.from(options.entries()).forEach(([key, items]) => {
      const itemsFiltered = items.filter(item => {
        return new RegExp(searchArg, 'ig').test(item.label);
      });
      if (itemsFiltered.length) {
        newMap.set(key, itemsFiltered);
      }
    });
    setOptions(newMap);
  }, [options]);

  return (
    <div className={'w-[350px]'}>
      <Select.Root 
        value={value} 
        labelExtractor={op => op.label} 
        keyExtractor={op => op.key}
      >
        <Select.Trigger label={args.label} />
        <Select.Popover>
          <Input.Search onChange={handleSearch} placeholder={args.placeholderSearchInput} className='px-deca'/>
          <Select.GroupedOptions
            groupedLabelExtractor={labelGroup => labelGroup} 
            options={options} 
            onSelect={setValue}
          />
        </Select.Popover>
      </Select.Root>
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
