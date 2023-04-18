import { Button, Select, Text } from '@tecsinapse/react-native-kit';
import React, { useCallback, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';

const StoryMeta: ComponentMeta<typeof Select> = {
  title: 'Select',
  component: Select,
  args: {
    label: 'Select',
    searchBarPlaceholder: 'Busque uma opção',
    selectModalTitle: 'Selecione uma opção',
    confirmButtonText: 'Confirmar',
    placeholder: 'Selecione...',
  },
};

export default StoryMeta;

type IStory = ComponentStory<typeof Select>;

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

type Option = { label: string; key: number };

const labelExtractor = (item: Option) => item.label;
const keyExtractor = (item: Option) => String(item.key);

export const Multi = (args: IStory) => {
  const [multiValue, setMultiValue] = useState<Option[]>([]);

  function handleSelectMultipleValues(keys: Option[]) {
    setMultiValue(keys);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    return options.filter(value => {
      if (searchArg) return value.label.includes(searchArg);
      else return true;
    });
  }, []);

  return (
    <Select
      {...args}
      options={options}
      value={multiValue}
      type={'multi'}
      onSelect={handleSelectMultipleValues}
      labelExtractor={labelExtractor}
      keyExtractor={keyExtractor}
      onSearch={handleSearch}
    />
  );
};

export const MultiCustom = (args: IStory) => {
  const [multiValue, setMultiValue] = useState<Option[]>([]);

  function handleSelectMultipleValues(keys: Option[]) {
    setMultiValue(keys);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    return options.filter(value => {
      if (searchArg) return value.label.includes(searchArg);
      else return true;
    });
  }, []);

  return (
    <Select
      {...args}
      options={options}
      value={multiValue}
      type={'multi'}
      onSelect={handleSelectMultipleValues}
      labelExtractor={labelExtractor}
      keyExtractor={keyExtractor}
      onSearch={handleSearch}
      controlComponent={(onPress, displayValue) => (
        <>
          <Button variant={'outlined'} onPress={onPress}>
            <Text fontWeight={'bold'} fontColor={'orange'}>
              Open select modal!
            </Text>
          </Button>
          <Text fontWeight={'bold'} typography={'base'}>
            Selected values: {displayValue}
          </Text>
        </>
      )}
    />
  );
};

export const Single = (args: IStory) => {
  const [singleValue, setSingleValue] = useState<Option | undefined>(undefined);

  function handleSelectSingleValue(key: Option | undefined) {
    setSingleValue(key);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    return options.filter(value => {
      if (searchArg) return value.label.includes(searchArg);
      else return true;
    });
  }, []);

  return (
    <Select
      {...args}
      options={options}
      value={singleValue}
      type={'single'}
      hideSearchBar
      onSelect={handleSelectSingleValue}
      labelExtractor={labelExtractor}
      onSearch={handleSearch}
      keyExtractor={keyExtractor}
    />
  );
};

export const SingleFetch = (args: IStory) => {
  const [fetchSingleValue, setFetchSingleValue] = useState<Option | undefined>(
    undefined
  );

  function handleSelectFetchSingleValue(key: Option | undefined) {
    setFetchSingleValue(key);
  }

  const optionsPromise = React.useCallback(
    async (searchInput: string | undefined) =>
      options.filter(value => {
        if (searchInput) return value.label.includes(searchInput);
        else return true;
      }),
    []
  );

  return (
    <Select
      {...args}
      options={optionsPromise}
      onSearch={optionsPromise}
      value={fetchSingleValue}
      type={'single'}
      onSelect={handleSelectFetchSingleValue}
      labelExtractor={labelExtractor}
      keyExtractor={keyExtractor}
    />
  );
};
