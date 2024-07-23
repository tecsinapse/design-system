export const handleSelectMulti = <T>(
  option: T,
  value: T[],
  onSelect: (value: T[]) => void
) => {
  const current: T[] = Array.from(value ?? []);
  const indexOf = current.indexOf(option);
  if (indexOf === -1) {
    current.push(option);
  } else {
    current.splice(indexOf, 1);
  }
  onSelect(current);
};
