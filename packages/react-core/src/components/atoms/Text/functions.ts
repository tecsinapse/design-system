export const getFirstCapitalCharacter = (value: string): string =>
  value.charAt(0).toUpperCase().concat(value.slice(1));

export const getLabel = (children, capitalFirst: boolean) =>
  typeof children === 'string' && capitalFirst
    ? getFirstCapitalCharacter(children)
    : children;
