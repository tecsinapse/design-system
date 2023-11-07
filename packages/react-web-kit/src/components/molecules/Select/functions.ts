import { MultiLabels } from './types';

const getMultiLabel = <Data>(
  value: Data | Data[] | undefined,
  options: Data[],
  multiLabels?: MultiLabels
) => {
  if (
    (value as Data[]).length > 0 &&
    (value as Data[]).length === options.length
  ) {
    return multiLabels?.allSelected ?? 'All items selected';
  }
  return multiLabels?.selection
    ? multiLabels?.selection?.((value as Data[]).length)
    : `${(value as Data[]).length} selected items`;
};

const getSingleLabel = <Data>(
  value: Data | undefined,
  options: Data[],
  keyExtractor: (option: Data, idx?: number) => string,
  placeholder: string | undefined,
  labelExtractor: (option: Data) => string
) => {
  const selectedOption = options.find(
    (option, index) =>
      keyExtractor(option, index) == keyExtractor(value as Data, index)
  );
  return selectedOption ? labelExtractor(selectedOption) : placeholder;
};

export const getDisplayValue = <Data>(
  type: 'multi' | 'single',
  value: Data | Data[] | undefined,
  options: Data[],
  placeholder: string | undefined,
  keyExtractor: (option: Data, idx?: number) => string,
  labelExtractor: (option: Data) => string,
  multiLabels?: MultiLabels
): string | undefined => {
  if (value === undefined || (value as Data[]).length === 0) return placeholder;
  if (type === 'multi' && (value as Data[]).length > 1)
    return getMultiLabel(value, options, multiLabels);
  return getSingleLabel(
    value instanceof Array ? value?.[0] : value,
    options,
    keyExtractor,
    placeholder,
    labelExtractor
  );
};
