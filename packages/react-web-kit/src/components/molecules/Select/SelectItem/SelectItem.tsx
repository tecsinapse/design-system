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
  value: Type extends 'single' ? string | undefined : string[];
  onSelect: (
    key: Type extends 'single' ? string | undefined : string[]
  ) => never | void;
  keyExtractor: (t: Data, index: number) => string;
  labelExtractor: (t: Data) => string;
  index: number;
}

const SelectItem = <Data, Type extends 'single' | 'multi'>({
  item,
  onSelect,
  type,
  keyExtractor,
  value,
  index,
  labelExtractor,
  setDropDownVisible,
}: SelectItemProps<Data, Type> & {
  setDropDownVisible: (t: boolean) => void;
}): JSX.Element => {
  const isMulti = type === 'multi';
  const [checked, setChecked] = React.useState<boolean>(
    value !== undefined && value.includes(keyExtractor(item, index))
  );

  const clickItem = (item, index) => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    const key: string = keyExtractor(item, index);

    if (Array.isArray(value)) {
      const auxChecked = !checked;
      setChecked(!checked);
      if (auxChecked) {
        onSelect([...value, key] as OnSelectArg);
      } else {
        const auxArray: string[] = value;
        const indexToExclude = auxArray.indexOf(key);
        auxArray.splice(indexToExclude, 1);
        onSelect([...auxArray] as OnSelectArg);
      }
    } else {
      onSelect(key as OnSelectArg);
      setDropDownVisible(false);
    }
  };

  return (
    <ContainerItemSelect onClick={() => clickItem(item, index)}>
      {isMulti && (
        <Checkbox checked={checked} onChange={() => clickItem(item, index)} />
      )}
      <StyledContainerTextLabel>
        <Text fontWeight="bold" ellipsizeMode="tail" numberOfLines={1}>
          <StyledSpan>{labelExtractor(item)}</StyledSpan>
        </Text>
      </StyledContainerTextLabel>
    </ContainerItemSelect>
  );
};

export default SelectItem;
