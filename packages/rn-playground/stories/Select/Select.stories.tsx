import { Button, Select, Text } from '@tecsinapse/react-native-kit';
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

const StoryMeta: Meta<typeof Select> = {
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

type IStory = StoryFn<typeof Select>;

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

type Option = { label: string; key: number };

const labelExtractor = (item: Option) => item.label;
const keyExtractor = (item: Option) => String(item.key);

export const Multi = {
  render: (args: IStory) => {
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
  },
};

export const MultiCustom = {
  render: (args: IStory) => {
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
  },
};

export const Single = {
  render: (args: IStory) => {
    const [singleValue, setSingleValue] = useState<Option | undefined>(
      undefined
    );

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
  },
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

const group1 = new Array(5).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));
const group2 = new Array(5).fill(undefined).map((_, index) => ({
  key: index + 5,
  label: `Option ${index + 5}`,
}));
const grouped = new Map().set('Group 1', group1).set('Group 2', group2);

export const SingleGroup = {
  render: (args: IStory) => {
    const [singleValue, setSingleValue] = useState<Option | undefined>(
      undefined
    );

    function handleSelectSingleValue(key: Option | undefined) {
      setSingleValue(key);
    }

    const handleSearch = React.useCallback((searchArg: string) => {
      return new Map(
        [...grouped].filter(([key, value]) => {
          if (searchArg) return value.label.includes(searchArg);
          else return true;
        })
      );
    }, []);

    return (
      <Select
        {...args}
        options={grouped}
        value={singleValue}
        type={'single'}
        hideSearchBar
        onSelect={handleSelectSingleValue}
        labelExtractor={labelExtractor}
        onSearch={handleSearch}
        keyExtractor={keyExtractor}
      />
    );
  },
};
