export const getIniciais = (name: string): string => {
  const nameSplit = name.split(' ');
  if (nameSplit.length > 1) {
    return nameSplit
      .slice(0, 2)
      .map(name => name[0])
      .join('');
  }
  return name[0];
};

export const getImage = (
  path: string,
  isAsset: boolean
): NodeRequire | { uri: string } => {
  return isAsset ? require(`${path}`) : { uri: path };
};
