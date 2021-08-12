import React, { FC } from 'react';
import { Checkbox, Text } from '@tecsinapse/react-core';
import { ContainerItemSelect, StyledSpan } from './styled';

interface SelectItemProps<Data, Type extends 'single' | 'multi'> {
  item: Data;
  type: Type;
  value: string[];
  onClick: (value: string[] | string) => void;
  keyExtractor: (t: Data, index: number) => string;
  index: number;
}

const SelectItem: FC<SelectItemProps<any, any>> = ({
  item,
  onClick,
  type,
  keyExtractor,
  value,
  index,
}) => {
  const isMulti = type === 'multi';

  const [checked, setChecked] = React.useState<boolean>(
    value.includes(keyExtractor(item, index))
  );

  const clickItem = (item, index) => {
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
      onClick(key);
    }
  };

  return (
    <ContainerItemSelect onClick={() => clickItem(item, index)}>
      <Text fontWeight="bold" style={{ paddingLeft: 8, width: '100%' }}>
        <StyledSpan>{item.label}</StyledSpan>
      </Text>
      {isMulti && (
        <Checkbox checked={checked} onChange={() => clickItem(item, index)} />
      )}
    </ContainerItemSelect>
  );
};

export default SelectItem;
