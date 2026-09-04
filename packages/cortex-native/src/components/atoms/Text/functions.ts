export const getFirstCapitalCharacter = (value: string): string =>
  value.charAt(0).toUpperCase().concat(value.slice(1));

export const getLabel = (
  children: React.ReactNode,
  capitalFirst: boolean,
): React.ReactNode =>
  typeof children === 'string' && capitalFirst
    ? getFirstCapitalCharacter(children)
    : children;
