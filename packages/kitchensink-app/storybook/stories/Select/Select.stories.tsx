import React, { useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import { Input, Select } from '@tecsinapse/react-native-kit';
import { ArtBoard } from '../ArtBoard';

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
  const [multiValue, setMultiValue] = useState([]);
  const [singleValue, setSingleValue] = useState();

  function handleSelectMultipleValues(keys) {
    setMultiValue(keys);
  }

  function handleSelectSingleValue(key) {
    setSingleValue(key);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    return options.filter(value => {if(searchArg) return value.label.includes(searchArg); else return true})
  }, []);

  const optionsPromise = React.useCallback(async (searchInput: string | undefined) => {
    const options = new Array(20).fill(undefined).map((_, index) => ({
        key: index,
        label: `Option ${index}`,}
    )).filter(value => {if(searchInput) return value.label.includes(searchInput); else return true})

    return options
  }, []);

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
      <Select
        options={optionsPromise}
        onSearch={optionsPromise}
        label="Single value"
        placeholder="Select one value"
        value={singleValue}
        type={'single'}
        onSelect={handleSelectSingleValue}
        selectModalTitle={'Selecione uma opção'}
        labelExtractor={item => item?.label}
        searchBarPlaceholder={'Busque uma opção'}
        confirmButtonText={'Confirmar'}
        keyExtractor={item => String(item?.key)}
        style={{
          marginBottom: 10,
        }}
      />
    </>
  );
};
