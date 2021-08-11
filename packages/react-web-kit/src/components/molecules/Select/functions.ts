export const getDisplayValue = (
  value,
  options,
  placeholder,
  keyExtractor,
  labelExtractor
) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return placeholder;
    else {
      return options
        .reduce(
          (acc, option, index) =>
            value.find(key => keyExtractor(option, index) == key)
              ? acc + labelExtractor(option) + ', '
              : acc,
          ''
        )
        .slice(0, -2);
    }
  } else {
    if (value === undefined) return placeholder;
    const selectedOption = options.find(
      (option, index) => keyExtractor(option, index) === value
    );
    return selectedOption ? labelExtractor(selectedOption) : placeholder;
  }
};
