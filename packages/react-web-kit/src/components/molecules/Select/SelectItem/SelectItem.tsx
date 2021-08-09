import React, { FC } from 'react';
import { Option } from '../Select';
import { Text } from '@tecsinapse/react-core';
import { ContainerItemSelect, StyledSpan } from './styled';

interface SelectItemProps {
  option: Option;
  onClick: (value: any) => void;
}

const SelectItem: FC<SelectItemProps> = ({ option, onClick }) => {
  return (
    <ContainerItemSelect onClick={onClick}>
      <Text fontWeight="bold">
        <StyledSpan>{option.label}</StyledSpan>
      </Text>
    </ContainerItemSelect>
  );
};

export default SelectItem;
