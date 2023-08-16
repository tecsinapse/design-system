export const getDisplayValue = <Data>(
  type: 'multi' | 'single',
  value: Data | Data[] | undefined,
  options: Data[],
  placeholder: string | undefined,
  keyExtractor: (option: Data, idx?: number) => string,
  labelExtractor: (option: Data) => string
): string | undefined => {
  if (type === 'multi') {
    if ((value as Data[]).length === 0) return placeholder;
    else {
      return (value as Data[])
        .reduce((acc, option) => acc + labelExtractor(option) + ', ', '')
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

export const getLabel = (displayValue, value, options) => {
  if (value.length > 0 && value.length === options.length) {
    return 'Todos itens selecionados';
  }
  if (value.length > 1) {
    return `${value.length} itens selecionados`;
  }
  return displayValue;
};
