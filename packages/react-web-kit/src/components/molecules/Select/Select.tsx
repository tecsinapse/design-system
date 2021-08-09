import React, { FC } from 'react';
import {
  StyledContainerContainer,
  StyledContainerDropdown,
  StyledInputContainer,
  SearchBarContainer,
} from './styled';
import {
  Icon,
  PressableInputContainer,
  Text,
  useDebouncedState,
} from '@tecsinapse/react-core';
import { ItemSelect } from './SelectItem';
import { Input } from '@tecsinapse/react-native-kit';

export type Option = {
  label: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  label: string;
  onSearch?: (searchArg: string) => void | never;
}
const Select: FC<SelectProps> = ({ options, label, onSearch }) => {
  const [selected, setSelected] = React.useState<Option>({
    label: '',
    value: '',
  });
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);

  const onOptionClicked = value => {
    setSelected(value);
    setExpanded(false);
  };

  return (
    <>
      <StyledContainerContainer>
        <StyledInputContainer>
          <PressableInputContainer
            label={label}
            onPress={() => setExpanded(!expanded)}
            rightComponent={
              <Icon
                name="chevron-down"
                type="material-community"
                size="centi"
                style={{ marginRight: 12 }}
              />
            }
          >
            <Text>{selected.value ? selected.label : label}</Text>
          </PressableInputContainer>
        </StyledInputContainer>
        {expanded && (
          <StyledContainerDropdown>
            <SearchBarContainer>
              <Input
                placeholder="Busque a opção desejada"
                value={searchArg}
                leftComponent={
                  <Icon
                    name="magnify"
                    type="material-community"
                    size="centi"
                    style={{ marginHorizontal: 12 }}
                  />
                }
                onChange={text => setSearchArg(text)}
              />
            </SearchBarContainer>
            {options.map(item => (
              <ItemSelect
                key={item.value}
                option={item}
                onClick={() => onOptionClicked(item)}
              />
            ))}
          </StyledContainerDropdown>
        )}
      </StyledContainerContainer>
    </>
  );
};

export default Select;
