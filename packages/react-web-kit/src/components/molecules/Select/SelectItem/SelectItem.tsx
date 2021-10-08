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
}: SelectItemProps<Data, Type> & {
  setDropDownVisible: (t: boolean) => void;
  checkedAll: boolean;
  setCheckedAll: (t: boolean) => void;
  lenghtOptions: number;
}): JSX.Element => {
  const isMulti = type === 'multi';
  const [checked, setChecked] = React.useState<boolean>(
    value !== undefined && type === 'multi' && (value as Data[]).includes(item)
  );
  React.useEffect(() => {
    if (type === 'multi') {
      checkedAll
        ? setChecked(true)
        : setChecked((value as Data[]).includes(item));
    }
  }, [checkedAll]);

  const clickItem = item => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    const key: Data = item;
    if (Array.isArray(value)) {
      const auxChecked = !checked;
      setChecked(!checked);
      if (auxChecked) {
        onSelect([...value, key] as OnSelectArg);
        [...value, key].length === lenghtOptions && setCheckedAll(true);
      } else {
        const auxArray: Data[] = [...value];
        const indexToExclude = auxArray.indexOf(key);
        auxArray.splice(indexToExclude, 1);
        onSelect([...auxArray] as OnSelectArg);
        setCheckedAll(false);
      }
    } else {
      onSelect(key as OnSelectArg);
      setDropDownVisible(false);
    }
  };

  return (
    <ContainerItemSelect onClick={() => clickItem(item)}>
      {isMulti && (
        <Checkbox checked={checked} onChange={() => clickItem(item)} />
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
