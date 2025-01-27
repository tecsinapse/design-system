import React from 'react';
import { Checkbox, Text } from '@tecsinapse/react-core';
import {
  ContainerItemSelect,
  StyledContainerTextLabel,
  StyledSpan,
} from './styled';

interface SelectItemProps<Data, Type extends 'single' | 'multi'> {
  item: Data;
  type: Type;
  value: Type extends 'single' ? Data | undefined : Data[];
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  index: number;
}

const SelectItem = <Data, Type extends 'single' | 'multi'>({
  item,
  onSelect,
  type,
  value,
  labelExtractor,
  setDropDownVisible,
  checkedAll,
  setCheckedAll,
  lenghtOptions,
  keyExtractor,
}: SelectItemProps<Data, Type> & {
  setDropDownVisible: (t: boolean) => void;
  checkedAll: boolean;
  setCheckedAll: (t: boolean) => void;
  lenghtOptions: number;
}): JSX.Element => {
  const isMulti = type === 'multi';
  const [checked, setChecked] = React.useState<boolean>(
    value !== undefined &&
      type === 'multi' &&
      (value as Data[]).find(
        data => keyExtractor(data) === keyExtractor(item)
      ) !== undefined
  );

  React.useEffect(() => {
    if (
      !checked &&
      value !== undefined &&
      ((type === 'multi' &&
        (value as Data[]).find(
          data => keyExtractor(data) === keyExtractor(item)
        )) ||
        (type === 'single' &&
          keyExtractor(value as Data) === keyExtractor(item)))
    )
      setChecked(true);
  }, [value, keyExtractor, type]);

  React.useEffect(() => {
    if (type === 'multi') {
      checkedAll
        ? setChecked(true)
        : setChecked(
            (value as Data[]).find(
              data => keyExtractor(data) === keyExtractor(item)
            ) !== undefined
          );
    }
  }, [checkedAll, value]);

  const clickItem = React.useCallback(
    (item, _value) => {
      // TS Workaround since TS won't infer the ternary operator's result type correctly
      type OnSelectArg = Parameters<typeof onSelect>[0];
      const key: Data = item;
      if (Array.isArray(_value)) {
        const auxChecked = !checked;
        setChecked(!checked);
        if (auxChecked) {
          onSelect([..._value, key] as OnSelectArg);
          if ([..._value, key].length === lenghtOptions) setCheckedAll(true);
        } else {
          const auxArray: Data[] = [..._value];
          const indexToExclude = auxArray.findIndex(
            data => keyExtractor(data) === keyExtractor(key)
          );
          auxArray.splice(indexToExclude, 1);
          onSelect([...auxArray] as OnSelectArg);
          setCheckedAll(false);
        }
      } else {
        onSelect(key as OnSelectArg);
        setDropDownVisible(false);
      }
    },
    [onSelect, setDropDownVisible, setCheckedAll, setChecked, checked]
  );

  return (
    <ContainerItemSelect onClick={() => clickItem(item, value)}>
      {isMulti && (
        <Checkbox checked={checked} onChange={() => clickItem(item, value)} />
      )}
      <StyledContainerTextLabel>
        <Text fontWeight="bold" ellipsizeMode="tail" numberOfLines={1}>
          <StyledSpan singleHighligh={type === 'single' && value === item}>
            {labelExtractor(item)}
          </StyledSpan>
        </Text>
      </StyledContainerTextLabel>
    </ContainerItemSelect>
  );
};

export default React.memo(SelectItem) as typeof SelectItem;
