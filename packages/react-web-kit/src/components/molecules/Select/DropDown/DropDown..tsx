import {
  SearchBarContainer,
  StyledContainerCheckAll,
  StyledContainerDropdown,
  StyledContainerTextLabel,
  StyledSpan,
  StyledTest,
} from './styled';
import { Icon, useDebouncedState } from '@tecsinapse/react-native-kit';
import { Input } from '@tecsinapse/react-web-kit';
import { ItemSelect } from '../SelectItem';
import React from 'react';
import { SelectProps } from '../Select';
import { Checkbox, Text } from '@tecsinapse/react-core';

const DropDown = <Data, Type extends 'single' | 'multi'>({
  options,
  onSearch,
  type,
  hideSearchBar,
  onSelect,
  value,
  keyExtractor,
  labelExtractor,
  setDropDownVisible,
}: SelectProps<Data, Type> & {
  setDropDownVisible: (t: boolean) => void;
}): JSX.Element => {
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);
  const lengthOptions = options.length;

  const [checkedAll, setCheckedAll] = React.useState<boolean>(
    type === 'multi' && (value as Data[])?.length === lengthOptions
  );

  const onClickCheckAll = () => {
    const items = options.map(option => option);
    setCheckedAll(!checkedAll);
    const aux = !checkedAll;
    type OnSelectArg = Parameters<typeof onSelect>[0];
    const auxArray: Data[] = [];
    !aux ? onSelect(auxArray as OnSelectArg) : onSelect(items as OnSelectArg);
  };
  return (
    <StyledContainerDropdown lengthOptions={lengthOptions}>
      {type === 'multi' && (
        <StyledContainerCheckAll onClick={onClickCheckAll}>
          <Checkbox checked={checkedAll} onChange={onClickCheckAll} />
          {!hideSearchBar ? (
            <SearchBarContainer>
              <Input
                style={{ width: '100%' }}
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
          ) : (
            <StyledContainerTextLabel>
              <Text fontWeight="bold">
                <StyledSpan>Selecionar todos</StyledSpan>
              </Text>
            </StyledContainerTextLabel>
          )}
        </StyledContainerCheckAll>
      )}
      <StyledTest lenghtOptions={options.length}>
        {options.map((item, index) => (
          <ItemSelect
            type={type}
            key={index}
            item={item}
            onSelect={onSelect}
            value={value}
            keyExtractor={keyExtractor}
            index={index}
            labelExtractor={labelExtractor}
            setDropDownVisible={setDropDownVisible}
            checkedAll={checkedAll}
            setCheckedAll={setCheckedAll}
            lenghtOptions={options.length}
          />
        ))}
      </StyledTest>
    </StyledContainerDropdown>
  );
};

export default DropDown;
