import { storiesOf } from '@storybook/react-native';
import { Button, Grid, Select, Text } from '@tecsinapse/react-native-kit';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
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
  const [fetchSingleValue, setFetchSingleValue] = useState();

  function handleSelectMultipleValues(keys) {
    setMultiValue(keys);
  }

  function handleSelectSingleValue(key) {
    setSingleValue(key);
  }

  function handleSelectFetchSingleValue(key) {
    setFetchSingleValue(key);
  }

  const handleSearch = React.useCallback((searchArg: string) => {
    return options.filter(value => {
      if (searchArg) return value.label.includes(searchArg);
      else return true;
    });
  }, []);

  const optionsPromise = React.useCallback(
    async (searchInput: string | undefined) => {
      const options = new Array(20)
        .fill(undefined)
        .map((_, index) => ({
          key: index,
          label: `Option ${index}`,
        }))
        .filter(value => {
          if (searchInput) return value.label.includes(searchInput);
          else return true;
        });

      return options;
    },
    []
  );

  const labelExtractor = useCallback((item) => item.label, [])
  const keyExtractor = useCallback((item) => String(item.key), [])

  return (
    <Grid spacing={'mili'} layout={[[12], [12], [12], [12]]}>
      <View>
        <Select
          options={options}
          label="Multiple values"
          value={multiValue}
          type={'multi'}
          onSelect={handleSelectMultipleValues}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
          searchBarPlaceholder={'Busque uma op????o'}
          selectModalTitle={'Selecione uma op????o'}
          confirmButtonText={'Confirmar'}
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
      </View>
      <View>
        <Select
          options={options}
          label="Multiple values"
          placeholder="Select some values"
          value={multiValue}
          type={'multi'}
          onSelect={handleSelectMultipleValues}
          labelExtractor={labelExtractor}
          keyExtractor={keyExtractor}
          searchBarPlaceholder={'Busque uma op????o'}
          selectModalTitle={'Selecione uma op????o'}
          confirmButtonText={'Confirmar'}
          onSearch={handleSearch}
        />
      </View>
      <View>
        <Select
          options={options}
          label="Single value"
          placeholder="Select one value"
          value={singleValue}
          type={'single'}
          hideSearchBar
          onSelect={handleSelectSingleValue}
          selectModalTitle={'Selecione uma op????o'}
          labelExtractor={labelExtractor}
          searchBarPlaceholder={'Busque uma op????o'}
          confirmButtonText={'Confirmar'}
          onSearch={handleSearch}
          keyExtractor={keyExtractor}
        />
      </View>
      <View>
        <Select
          options={optionsPromise}
          onSearch={optionsPromise}
          label="Single value (Fetch)"
          placeholder="Select one value"
          value={fetchSingleValue}
          type={'single'}
          onSelect={handleSelectFetchSingleValue}
          selectModalTitle={'Selecione uma op????o'}
          labelExtractor={labelExtractor}
          searchBarPlaceholder={'Busque uma op????o'}
          confirmButtonText={'Confirmar'}
          keyExtractor={keyExtractor}
        />
      </View>
    </Grid>
  );
};
