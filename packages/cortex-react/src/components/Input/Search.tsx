import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebouncedState } from '../../hooks';
import { InputBox } from './Box';
import { InputFace } from './Face';
import { InputLeft } from './Left';
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
      <InputFace variants={variants} className={className}>
        <InputLeft>
          <IoSearchOutline data-testid={'icon-search-left'} />
        </InputLeft>
        <InputBox {...rest} ref={ref} onChange={e => setSearchInputEvent(e)} />
      </InputFace>
    );
  }
);
