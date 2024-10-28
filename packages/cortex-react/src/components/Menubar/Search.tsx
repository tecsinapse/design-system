import React from 'react';
import { Input, InputSearchProps } from '../Input';
import clsx from 'clsx';
import { animate } from '../../styles/menubar';
import { useMenubar } from '../../provider';
import { useDimensions } from '../../hooks';

const Search = (props: InputSearchProps) => {
  const [show] = useMenubar();
  const { width } = useDimensions();

  return (
    <Input.Search
      {...props}
      className={clsx(
        { 'mx-deca': width <= 640 },
        { 'mr-deca': width > 640 },
        'flex-1',
        animate({ show: show })
      )}
    />
  );
};

export default Search;
