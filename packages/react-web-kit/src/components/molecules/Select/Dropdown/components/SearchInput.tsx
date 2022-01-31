import React from 'react';
import { Icon } from '@tecsinapse/react-core';
import { Input } from '../../../../atoms/Input';

const InputIcon = (
  <Icon
    name="magnify"
    type="material-community"
    size="centi"
    style={{ marginHorizontal: 12 }}
  />
);

const SearchInput = ({ fullWidth, searchArg, onChange, placeholder }) => {
  return (
    <Input
      style={fullWidth}
      placeholder={placeholder}
      value={searchArg}
      leftComponent={InputIcon}
      onChange={onChange}
    />
  );
};

export default React.memo(SearchInput);
