export const getNameInitials = (name: string) => {
  const [firstName, lastName] = name.split(' ');
  return `${firstName?.charAt(0)}${lastName?.charAt(0) ?? ''}`;
};
