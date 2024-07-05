import React from 'react';
import SearchInput, { SearchInputProps } from '../SearchInput';
import clsx from 'clsx';
import { animate } from '../../styles/menubar';
import { useMenubar } from '../../provider';

const Search = (props: SearchInputProps) => {
  const [show] = useMenubar();

  return (
    <SearchInput
      {...props}
      className={clsx('mr-tera flex-1', animate({ show: show }))}
    />
  );
};

export default Search;
