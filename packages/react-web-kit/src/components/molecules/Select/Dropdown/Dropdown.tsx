import React from 'react';
import { Checkbox, Text, useDebouncedState } from '@tecsinapse/react-core';
import { ItemSelect } from '../SelectItem';
import { SelectProps } from '../Select';
import {
  SearchBarContainer,
  StyledContainerCheckAll,
  StyledContainerDropdown,
  StyledContainerTextLabel,
  StyledSpan,
  OptionsContainer,
  PaddedContainer,
} from './styled';
import { SearchInput } from './components';

const fullWidth = { width: '100%' };

const Component = <Data, Type extends 'single' | 'multi'>(
  {
    options,
    onSearch,
    type,
    hideSearchBar,
    onSelect,
    value,
    keyExtractor,
    labelExtractor,
    setDropDownVisible,
    style,
    anchor,
    selectAllLabel,
    searchBarPlaceholder,
  }: SelectProps<Data, Type> & {
    setDropDownVisible: (t: boolean) => void;
  },
  ref: React.ForwardedRef<HTMLDivElement>
): React.ReactElement => {
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);
  const lengthOptions = React.useMemo(() => options.length, [options]);

  const [checkedAll, setCheckedAll] = React.useState<boolean>(
    type === 'multi' && (value as Data[])?.length === lengthOptions
  );

  React.useEffect(() => {
    if (type === 'multi') {
      lengthOptions === (value as Data[])?.length
        ? setCheckedAll(true)
        : setCheckedAll(false);
    }
  }, [value, type, lengthOptions]);

  const onClickCheckAll = React.useCallback(() => {
    const items = (options as Data[]).map(option => option);
    let aux;
    setCheckedAll(prev => {
      aux = !prev;
      return !prev;
    });
    type OnSelectArg = Parameters<typeof onSelect>[0];
    const auxArray: Data[] = [];
    !aux ? onSelect(auxArray as OnSelectArg) : onSelect(items as OnSelectArg);
  }, [options, setCheckedAll, onSelect]);

  const onChange = React.useCallback(
    text => setSearchArg(text),
    [setSearchArg]
  );

  return (
    <StyledContainerDropdown
      lengthOptions={lengthOptions}
      style={style}
      anchor={anchor}
      ref={ref}
    >
      {type === 'multi' && (
        <StyledContainerCheckAll
          onClick={hideSearchBar ? onClickCheckAll : undefined}
        >
          <Checkbox checked={checkedAll} onChange={onClickCheckAll} />
          {!hideSearchBar ? (
            <SearchBarContainer>
              <SearchInput
                searchArg={searchArg}
                onChange={onChange}
                fullWidth={fullWidth}
                placeholder={searchBarPlaceholder}
              />
            </SearchBarContainer>
          ) : (
            <StyledContainerTextLabel>
              <Text fontWeight="bold">
                <StyledSpan>{selectAllLabel}</StyledSpan>
              </Text>
            </StyledContainerTextLabel>
          )}
        </StyledContainerCheckAll>
      )}
      {type === 'single' && !hideSearchBar && (
        <PaddedContainer>
          <SearchInput
            searchArg={searchArg}
            onChange={onChange}
            fullWidth={fullWidth}
            placeholder={searchBarPlaceholder}
          />
        </PaddedContainer>
      )}
      <OptionsContainer lengthOptions={options.length}>
        {(options as Data[]).map((item, index) => (
          <ItemSelect
            type={type}
            key={keyExtractor(item)}
            item={item}
            onSelect={onSelect}
            value={value}
            keyExtractor={keyExtractor}
            index={index}
            labelExtractor={labelExtractor}
            setDropDownVisible={setDropDownVisible}
            checkedAll={checkedAll}
            setCheckedAll={setCheckedAll}
            lenghtOptions={lengthOptions}
          />
        ))}
      </OptionsContainer>
    </StyledContainerDropdown>
  );
};
const Dropdown = React.forwardRef(Component) as <
  Data,
  Type extends 'single' | 'multi',
>(
  props: SelectProps<Data, Type> & {
    setDropDownVisible: (t: boolean) => void;
  } & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof Component>;

export default Dropdown;
