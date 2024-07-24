import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Input } from '.';
import { useDebouncedState } from '../../hooks';
import { InputSearchProps } from './types';

/** Teste Search docs */
export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      bounceTimeout = 1000,
      variants,
      className,
      onChange,
      ...rest
    }: InputSearchProps,
    ref
  ) => {
    const [bouncedTextEvent, setBouncedTextEvent] =
      useState<ChangeEvent<HTMLInputElement>>();
    const [searchInputEvent, setSearchInputEvent] = useDebouncedState<
      ChangeEvent<HTMLInputElement> | undefined
    >(undefined, setBouncedTextEvent, bounceTimeout);

    useEffect(() => {
      if (onChange && searchInputEvent) {
        onChange(searchInputEvent);
      }
    }, [bouncedTextEvent]);

    return (
      <Input.Face variants={variants} className={className}>
        <Input.Left>
          <IoSearchOutline data-testid={'icon-search-left'} />
        </Input.Left>
        <Input.Box {...rest} ref={ref} onChange={e => setSearchInputEvent(e)} />
      </Input.Face>
    );
  }
);
