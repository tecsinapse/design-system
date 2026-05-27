import React, { FC, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {
  CountryIso2,
  defaultCountries,
  parseCountry,
  ParsedCountry,
} from 'react-international-phone';
import { Divider } from '../../atoms/Divider';
import { InputElement } from '../../atoms/Input';
import { Text, TextProps } from '../../atoms/Text';
import CountryOption from './CountryOption';
import { StyledCountrySelectorRoot, StyledSearchContainer } from './styled';
import { CountryOptionProps, PhoneCountrySearchInputProps } from './types';

const parsedDefaultCountries = defaultCountries.map(c => parseCountry(c));

export interface PhoneCountrySelectorProps extends ViewProps {
  selectedCountry?: ParsedCountry;
  onSelectCountry: (country: ParsedCountry) => void;
  countries?: ParsedCountry[];
  hasSearch?: boolean;
  searchPlaceholder?: string;
  CountryOptionComponent?: FC<CountryOptionProps>;
  TextComponent?: FC<TextProps>;
  SearchInputComponent?: FC<PhoneCountrySearchInputProps>;
  ItemSeparatorComponent?: FC;
  listHeight?: number;
  listStyle?: StyleProp<ViewStyle>;
}

const DefaultSearchInput: FC<PhoneCountrySearchInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
}) => (
  <InputElement
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
  />
);

const PhoneCountrySelector: FC<PhoneCountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
  countries = parsedDefaultCountries,
  hasSearch = true,
  searchPlaceholder = 'Search country',
  CountryOptionComponent = CountryOption,
  TextComponent = Text,
  SearchInputComponent = DefaultSearchInput,
  ItemSeparatorComponent,
  listHeight,
  listStyle,
  ...rest
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

  const handleSelect = (country: ParsedCountry) => {
    onSelectCountry(country);
  };

  const renderItem: ListRenderItem<ParsedCountry> = ({ item }) => (
    <CountryOptionComponent
      country={item}
      onPress={handleSelect}
      TextComponent={TextComponent}
    />
  );

  const Separator =
    ItemSeparatorComponent ?? (() => <Divider linePosition="bottom" />);

  const listHeader = selectedCountry ? (
    <>
      <CountryOptionComponent
        country={selectedCountry}
        onPress={handleSelect}
        disabled
        TextComponent={TextComponent}
      />
      <Separator />
    </>
  ) : null;

  return (
    <StyledCountrySelectorRoot {...rest}>
      {hasSearch ? (
        <StyledSearchContainer>
          <SearchInputComponent
            value={searchText}
            onChange={setSearchText}
            placeholder={searchPlaceholder}
          />
        </StyledSearchContainer>
      ) : null}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item: ParsedCountry) =>
          `${item.dialCode}-${item.iso2 as CountryIso2}`
        }
        renderItem={renderItem}
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
    </StyledCountrySelectorRoot>
  );
};

export default PhoneCountrySelector;
