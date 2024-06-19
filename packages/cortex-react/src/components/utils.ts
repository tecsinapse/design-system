export const getNameInitials = (name: string) => {
  const nameSplit = name.split(' ');
  const length = nameSplit.length;
  if (length > 1) {
    return `${nameSplit[0][0]}${nameSplit[length - 1][0]}`;
  }
  return name[0];
};
