import React, { useMemo, useState } from 'react';
import { FlatList, StyleProp, View, ViewStyle } from 'react-native';
import type { CountryIso2, ParsedCountry } from 'react-international-phone';
import { cn } from '@tecsinapse/cortex-core';
import Input from '../../atoms/Input/Input';
import Divider from '../../atoms/Divider/Divider';
import CountryOption, { CountryOptionProps } from './CountryOption';

export interface PhoneCountrySelectorProps {
  selectedCountry?: ParsedCountry;
  onSelectCountry: (country: ParsedCountry) => void;
  countries?: ParsedCountry[];
  hasSearch?: boolean;
  searchPlaceholder?: string;
  CountryOptionComponent?: React.FC<CountryOptionProps>;
  listHeight?: number;
  listStyle?: StyleProp<ViewStyle>;
  className?: string;
  testID?: string;
}

const PhoneCountrySelector: React.FC<PhoneCountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  countries = [],
  hasSearch = true,
  searchPlaceholder = 'Search country',
  CountryOptionComponent = CountryOption,
  listHeight,
  listStyle,
  className,
  testID,
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredCountries = useMemo(() => {
    return countries.filter(
      c =>
        c.iso2 !== selectedCountry?.iso2 &&
        (c.name.toLowerCase().includes(searchText.toLowerCase()) ||
          c.dialCode.includes(searchText))
    );
  }, [countries, selectedCountry, searchText]);

  const Separator = () => <Divider linePosition="bottom" />;

  const listHeader = selectedCountry ? (
    <>
      <CountryOptionComponent
        country={selectedCountry}
        onPress={onSelectCountry}
        disabled
      />
      <Separator />
    </>
  ) : null;

  return (
    <View testID={testID} className={cn('w-full flex-col', className)}>
      {hasSearch ? (
        <View className="p-deca">
          <Input
            value={searchText}
            onChange={setSearchText}
            placeholder={searchPlaceholder}
          />
        </View>
      ) : null}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item: ParsedCountry) =>
          `${item.dialCode}-${item.iso2 as CountryIso2}`
        }
        renderItem={({ item }) => (
          <CountryOptionComponent
            country={item}
            onPress={onSelectCountry}
          />
        )}
        ListHeaderComponent={listHeader}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator
        style={[
          { width: '100%' },
          listHeight != null ? { height: listHeight } : { flex: 1 },
          listStyle,
        ]}
      />
    </View>
  );
};

export default PhoneCountrySelector;
