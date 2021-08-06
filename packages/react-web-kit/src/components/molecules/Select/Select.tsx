import React, { FC } from 'react';
import {
  StyledContainerContainer,
  StyledContainerDropdown,
  StyledInputContainer,
} from './styled';
import {
  FontColorType,
  PressableInputContainer,
  Text,
} from '@tecsinapse/react-core';
import { ItemSelect } from './SelectItem';

export type Option = {
  label: string;
  value: string;
  fontColor: string;
};

interface SelectProps {
  options: Option[];
}
const Select: FC<SelectProps> = ({ options }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <>
      <StyledContainerContainer>
        <StyledInputContainer>
          <PressableInputContainer onPress={() => setExpanded(!expanded)}>
            <Text>Label do select</Text>
          </PressableInputContainer>
        </StyledInputContainer>
        {expanded && (
          <StyledContainerDropdown>
            {options.map(item => (
              <ItemSelect option={item} />
            ))}
          </StyledContainerDropdown>
        )}
      </StyledContainerContainer>
    </>
  );
};

export default Select;
