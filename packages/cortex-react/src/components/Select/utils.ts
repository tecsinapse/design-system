export const handleSelectMulti = <T>(
  option: T,
  value: T[],
  onSelect: (value: T[]) => void,
  keyExtractor: (value: T) => string
) => {
  const current: T[] = Array.from(value ?? []);
  const indexOf = current.findIndex(
    it => keyExtractor(it) === keyExtractor(option)
  );
  if (indexOf === -1) {
    current.push(option);
  } else {
    current.splice(indexOf, 1);
  }
  onSelect(current);
};
