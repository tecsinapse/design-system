export const getDisplayValue = <Data>(
  type,
  value,
  options,
  placeholder,
  keyExtractor,
  labelExtractor
): Data | Data[] => {
  if (type === 'multi') {
    if (value.length === 0) return placeholder;
    else {
      return options
        .reduce(
          (acc, option, index) =>
            value.find(
              key => keyExtractor(option, index) == keyExtractor(key, index)
            )
              ? acc + labelExtractor(option) + ', '
              : acc,
          ''
        )
        .slice(0, -2);
    }
  } else {
    if (value === undefined) return placeholder;
    const selectedOption = options.find(
      (option, index) =>
        keyExtractor(option, index) == keyExtractor(value as Data, index)
    );
    return selectedOption ? labelExtractor(selectedOption) : placeholder;
  }
};
