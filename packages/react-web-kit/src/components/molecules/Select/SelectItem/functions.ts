export const clickItem = (
  item,
  index,
  keyExtractor,
  checked,
  setChecked,
  isMulti,
  onClick,
  value
) => {
  const key = keyExtractor(item, index);
  const auxChecked = !checked;
  setChecked(!checked);
  if (isMulti) {
    if (auxChecked) {
      onClick([...value, key]);
    } else {
      const auxArray = value;
      const indexToExclude = auxArray.indexOf(key);
      auxArray.splice(indexToExclude, 1);
      onClick([...auxArray]);
    }
  } else {
    onClick([key]);
  }
};
