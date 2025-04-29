export const getNameInitials = (name: string) => {
  const [firstName, ...rest] = name.split(' ');
  return `${firstName?.charAt(0)}${rest?.[rest?.length - 1]?.charAt(0) ?? ''}`;
};
