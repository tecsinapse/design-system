import { storiesOf } from '@storybook/react-native';
import React, { useState } from 'react';
import { ArtBoard } from '../ArtBoard';
import { Input, Select, Text } from '@tecsinapse/react-native-kit';

storiesOf('Input', module)
  .addDecorator(getStory => <ArtBoard>{getStory()}</ArtBoard>)
  .add('Select', () => {
    return <Component />;
  });

const options = new Array(20).fill(undefined).map((_, index) => ({
  key: index,
  label: `Option ${index}`,
}));

const Component = () => {
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [singleValue, setSingleValue] = useState<string | undefined>();

  function handleSelectMultipleValues(keys: string[]) {
    setMultiValue(keys);
  }

  function handleSelectSingleValue(key: string | undefined) {
    setSingleValue(key);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    console.log(searchArg)
  }, [])

  return (
    <>
      <Select
        options={options}
        label="Multiple values"
        placeholder="Select some values"
        value={multiValue}
        type={'multi'}
        onSelect={handleSelectMultipleValues}
        labelExtractor={item => item.label}
        keyExtractor={item => String(item.key)}
        searchBarPlaceholder={'Busque uma opção'}
        selectModalTitle={'Selecione uma opção'}
        confirmButtonText={'Confirmar'}
        onSearch={handleSearch}
        style={{
          marginBottom: 10,
        }}
      />
      <Select
        options={options}
        label="Single value"
        placeholder="Select one value"
        value={singleValue}
        type={'single'}
        hideSearchBar
        onSelect={handleSelectSingleValue}
        selectModalTitle={'Selecione uma opção'}
        labelExtractor={item => item.label}
        searchBarPlaceholder={'Busque uma opção'}
        confirmButtonText={'Confirmar'}
        onSearch={handleSearch}
        keyExtractor={item => String(item.key)}
      />
    </>
  );
};
