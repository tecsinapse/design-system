import React from 'react';

const normalize = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-[\]{}()*+?.,\\^$|#]/g, ' ')
    .toLowerCase();
};

const matchSpliter = (
  str: string,
  indexes: number[],
  size: number
): string[] => {
  const result: string[] = [];
  let currentIndex = 0;

  indexes.forEach((index: number) => {
    result.push(str.substring(currentIndex, index));
    result.push(str.substring(index, index + size));
    currentIndex = index + size;
  });

  result.push(str.substring(currentIndex, str.length));

  return result.filter(e => e);
};

export const stringMatcher = (
  searchTerm: string,
  textToReplace: string
): RegExpMatchArray[] => {
  const s = normalize(searchTerm);
  const tx = normalize(textToReplace);

  const r = new RegExp(`(${s})`, 'g');

  return Array.from(tx.matchAll(r));
};

const highlightReplacer = <T,>(
  searchTerm: string,
  textToReplace: string,
  Component: React.ElementType,
  props: T
): React.ReactNode => {
  const search = normalize(searchTerm);
  const matches = stringMatcher(searchTerm, textToReplace);

  if (matches.length <= 0) {
    return textToReplace;
  }

  const indexes: number[] = matches.map(match => match.index) as number[];
  const splited = matchSpliter(textToReplace, indexes, searchTerm.length);

  return splited.map((value, idx) => {
    return normalize(value) === search ? (
      <Component key={`highlight-${value}${idx}`} {...props}>
        {value}
      </Component>
    ) : (
      <>{value}</>
    );
  });
};

export const highlight = <T,>(
  searchTerm: string,
  textToReplace: string,
  Component: React.ElementType,
  props: T
): React.ReactNode => {
  if (textToReplace && searchTerm) {
    return highlightReplacer(searchTerm, textToReplace, Component, props);
  }

  return textToReplace;
};
