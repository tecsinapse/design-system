import { Extractor, SelectType } from './types';

export const findValue = <Data>(
  array: Data[],
  value: Data,
  keyExtractor: Extractor<Data>,
  idx?: number
) => array.find(it => keyExtractor(value, idx) === keyExtractor(it, idx));

export const isOptionChecked = <Data>(
  type: SelectType,
  option: Data,
  src: Data[],
  keyExtractor: Extractor<Data>,
  idx: number
) =>
  type === 'multi'
    ? !!findValue(src, option, keyExtractor, idx)
    : keyExtractor(src[0] ?? ({} as Data), idx) == keyExtractor(option, idx);

export const multiBuilder = <Data>(
  option: Data,
  src: Data[],
  keyExtractor: Extractor<Data>
) => {
  const array: Data[] = [];
  let found = false;
  for (const value of src) {
    if (keyExtractor(value) != keyExtractor(option)) array.push(value);
    else found = true;
  }
  if (!found) array.push(option);
  return array;
};

export const singleBuilder = <Data>(
  option: Data,
  src: Data[],
  keyExtractor: Extractor<Data>
) =>
  keyExtractor(src[0] ?? ({} as Data)) === keyExtractor(option) ? [] : [option];

export const isMap = <Data>(value: Data[] | Map<string, Data[]>) =>
  value instanceof Map;

export const mapToArray = <Data>(map: Map<string, Data[]>) =>
  [...map.values()].flatMap(v => v);

export const getMultiLabel = <Data>(
  value: Data[],
  placeholder: string,
  options: Data[] | Map<string, Data[]>,
  keyExtractor: Extractor<Data>,
  labelExtractor: Extractor<Data>
): string => {
  if (value.length === 0) return placeholder;
  else {
    const optionsArray: Data[] =
      options instanceof Map ? mapToArray(options) : options;
    const available = optionsArray.length > 0 ? optionsArray : value;
    return available
      ?.reduce(
        (acc, option, index) =>
          findValue(value, option, keyExtractor, index)
            ? acc + labelExtractor(option) + ', '
            : acc,
        ''
      )
      .slice(0, -2);
  }
};

export const getSingleLabel = <Data>(
  value: Data | null | undefined,
  placeholder: string,
  options: Data[] | Map<string, Data[]>,
  keyExtractor: Extractor<Data>,
  labelExtractor: Extractor<Data>
) => {
  if (!value) return placeholder;
  const optionsArray: Data[] =
    options instanceof Map ? mapToArray(options) : options;
  const selectedOption = optionsArray?.find(
    (option, index) => keyExtractor(option, index) == keyExtractor(value, index)
  );
  return labelExtractor(selectedOption ?? value);
};
