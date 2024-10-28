import React from 'react';
import { Input, InputSearchProps } from '../Input';
import clsx from 'clsx';
import { animate } from '../../styles/menubar';
import { useMenubar } from '../../provider';

const Search = (props: InputSearchProps) => {
  const [show] = useMenubar();

  return (
    <Input.Search
      {...props}
      className={clsx('flex-1', animate({ show: show }))}
    />
  );
};

export default Search;
