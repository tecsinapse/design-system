import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Icon from '../../../atoms/Icon/Icon';
import Input from '../../../atoms/Input/Input';

export interface SelectSearchProps extends ViewProps {
  searchArg: string;
  setSearchArg: (value: string) => void;
  searchBarPlaceholder?: string;
}

const Search = ({
  className,
  searchArg,
  setSearchArg,
  searchBarPlaceholder,
  ...rest
}: SelectSearchProps): React.ReactElement => (
  <View {...rest} className={cn('px-deca py-centi', className)}>
    <Input
      placeholder={searchBarPlaceholder}
      value={searchArg}
      onChange={setSearchArg}
      leftComponent={
        <Icon name="search" type="ionicon" size="centi" fontColor="low" />
      }
    />
  </View>
);

Search.displayName = 'Select.Search';

export default Search;
