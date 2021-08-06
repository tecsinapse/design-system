import React, { FC } from 'react';
import { Option } from '../Select';
import { Text } from '@tecsinapse/react-core';
import { ContainerItemSelect } from './styled';

interface SelectItemProps {
  option: Option;
}
const SelectItem: FC<SelectItemProps> = ({ option }) => {
  return (
    <ContainerItemSelect>
      {/*@ts-ignore*/}
      <Text fontColor={option.fontColor}>{option.label}</Text>
    </ContainerItemSelect>
  );
};

export default SelectItem;
