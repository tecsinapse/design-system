import React from 'react';
import { Text, TextProps } from '@tecsinapse/react-core';
import { MostUsedType } from '../types';
import { StyledSearchItemContainer, HighlightText } from './styled';
import { highlight } from './utils';

interface SearchResultItem {
  data: MostUsedType;
  searchTerm: string;
  toggle: () => void;
}

const SearchResultItem: React.FC<SearchResultItem> = ({
  data,
  searchTerm,
  toggle,
}) => {
  const { title, category, Component, props } = data;
  const noTextDecoration = { textDecoration: 'none' };

  const textProps: TextProps = { fontColor: 'orange', fontWeight: 'bold' };

  return (
    <Component {...props} style={noTextDecoration} onClick={toggle}>
      <StyledSearchItemContainer>
        <Text typography="base" colorVariant="secondary" colorTone="dark">
          {highlight(searchTerm, title, HighlightText, textProps)}
        </Text>
        <Text
          typography="sub"
          fontWeight="bold"
          colorVariant="secondary"
          colorTone="medium"
        >
          {category}
        </Text>
      </StyledSearchItemContainer>
    </Component>
  );
};

export default SearchResultItem;
