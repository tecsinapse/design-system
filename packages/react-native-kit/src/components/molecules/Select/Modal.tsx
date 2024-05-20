import {
  Checkbox,
  getStatusBarHeight,
  RadioButton,
  RFValue,
  useDebouncedState,
} from '@tecsinapse/react-core';
import * as React from 'react';
import { FlatList, ListRenderItemInfo, SectionList, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Header } from '../../atoms/Header';
import { Input } from '../../atoms/Input';
import { IBaseModal, ModalView } from '../../atoms/Modal';
import { Text } from '../../atoms/Text';
import { SelectNativeProps } from './Select';
import {
  Divider,
  FetchIndicator,
  getStyledModal,
  ListItem,
  ModalFooter,
  SearchBarContainer,
  SectionHeader,
  SelectIcon,
  StyledTextItemSelect,
  TextTitleModal,
} from './styled';

interface LoadingProps {
  loading?: boolean;
}
type OptionData<T> = T & { _checked: boolean };

const Component = <Data, Type extends 'single' | 'multi'>({
  options,
  keyExtractor,
  labelExtractor,
  hideSearchBar,
  searchBarPlaceholder,
  focused,
  type,
  value,
  onSelect,
  onSearch,
  selectModalTitle,
  selectModalTitleComponent,
  confirmButtonText,
  loading,
  close,
  closeOnPick,
  ...others
}: SelectNativeProps<Data, Type> & LoadingProps & IBaseModal): JSX.Element => {
  const [selectedValues, setSelectedValues] = React.useState<Data[]>([]);
  const [searchArg, setSearchArg] = useDebouncedState<string>('', onSearch);
  const ModalComponent = React.useMemo(
    () => getStyledModal(getStatusBarHeight(true)),
    []
  );
  const _closeOnPick = closeOnPick && type === 'single';

  // Resets the temporary state to the initial state whenever the
  // modal is reopened or the value changes
  React.useEffect(() => {
    setSelectedValues(
      (value ? (type === 'multi' ? value : [value]) : []) as Data[]
    );
  }, [value, focused, setSelectedValues]);

  const getData = React.useCallback(
    (_options: Data[] | Map<string, Data[]>): OptionData<Data>[] => {
      // Here we need to convert map to array
      const options =
        _options instanceof Map ? Object.values(_options) : _options;
      // if (options instanceof Map) return options as Map<string, Data[]>;
      return ((options as Data[]) ?? []).map((option, index) => ({
        ...option,
        _checked:
          type === 'multi'
            ? !!selectedValues.find(
                value =>
                  keyExtractor(option, index) == keyExtractor(value, index)
              )
            : keyExtractor((selectedValues[0] || {}) as Data, index) ==
              keyExtractor(option, index),
      }));
    },
    [keyExtractor, selectedValues, type]
  );

  const data = React.useMemo(
    () => (typeof options !== 'function' ? getData(options) : []),
    [options, getData]
  );

  const handlePressItem = React.useCallback(
    (option: Data) => {
      setSelectedValues(selectedValues => {
        if (type === 'multi') {
          const newArr: Data[] = [];
          let found = false;
          for (const value of selectedValues) {
            if (keyExtractor(value) != keyExtractor(option)) newArr.push(value);
            else found = true;
          }
          if (!found) newArr.push(option);
          return newArr;
        }
        return keyExtractor((selectedValues[0] || {}) as Data) ===
          keyExtractor(option)
          ? []
          : [option];
      });
    },
    [selectedValues, setSelectedValues, keyExtractor, type]
  );

  React.useEffect(() => {
    if (_closeOnPick && selectedValues[0] && selectedValues[0] !== value) {
      handleConfirm();
    }
  }, [selectedValues[0], value, closeOnPick]);

  const handleConfirm = React.useCallback(() => {
    // TS Workaround since TS won't infer the ternary operator's result type correctly
    type OnSelectArg = Parameters<typeof onSelect>[0];
    onSelect(
      (type === 'single' ? selectedValues[0] : selectedValues) as OnSelectArg
    );
    close?.();
  }, [selectedValues]);

  const optionBuilder = React.useCallback(
    ({ item }: ListRenderItemInfo<Data & { _checked: boolean }>) => (
      <MemoizedOption
        item={item}
        type={type}
        handlePressItem={handlePressItem}
        labelExtractor={labelExtractor}
      />
    ),
    []
  );

  const anyChecked = (data as OptionData<Data>[]).filter(
    item => item._checked
  ).length;
  const dataLengthChanged = (data as OptionData<Data>[]).length;

  const sectionList =
    options instanceof Map
      ? [...options].map(([key, value]) => ({
          title: key,
          data: getData(value),
        }))
      : [];

  // console.log(Object.entries(options));

  const memoizedFlatlist = React.useMemo(
    () =>
      !(options instanceof Map) ? (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          fadingEdgeLength={200}
          ItemSeparatorComponent={Divider}
          renderItem={optionBuilder}
        />
      ) : (
        <SectionList
          sections={sectionList}
          renderItem={optionBuilder}
          ItemSeparatorComponent={Divider}
          renderSectionHeader={SectionHead}
        />
      ),
    [selectedValues, anyChecked, dataLengthChanged, sectionList]
  );

  const titleTextModal = selectModalTitle ? (
    <TextTitleModal
      typography="h4"
      fontWeight="bold"
      numberOfLines={3}
      style={{ maxWidth: RFValue(250) }}
    >
      {selectModalTitle}
    </TextTitleModal>
  ) : null;

  const headerContent = selectModalTitleComponent
    ? selectModalTitleComponent
    : titleTextModal;

  return (
    <ModalView {...others} BoxComponent={ModalComponent} showCloseBar={false}>
      <Header
        rightButton={{
          onPress: close,
          icon: {
            name: 'close',
            type: 'material-community',
            fontColor: 'light',
          },
        }}
      >
        {headerContent}
      </Header>

      {!hideSearchBar && (
        <SearchBarContainer>
          <Input
            placeholder={searchBarPlaceholder}
            value={searchArg}
            onChange={setSearchArg}
            leftComponent={
              <SelectIcon name="search" type="ionicon" size="centi" />
            }
          />
        </SearchBarContainer>
      )}

      {loading && (
        <FetchIndicator animating={true} color={'grey'} size={'large'} />
      )}

      {memoizedFlatlist}

      {!_closeOnPick && (
        <ModalFooter>
          <Button
            variant={'filled'}
            color={'primary'}
            onPress={handleConfirm}
            disabled={loading}
          >
            <Text fontColor={'light'} fontWeight="bold">
              {confirmButtonText}
            </Text>
          </Button>
        </ModalFooter>
      )}
    </ModalView>
  );
};

interface IOption<T> {
  item: T & { _checked: boolean };
  type: 'single' | 'multi';
  labelExtractor: (option: T) => string;
  handlePressItem: (option: T) => void;
}

const SectionHead = ({ section: { title } }) => (
  <SectionHeader>
    <Text fontWeight={'bold'}>{title}</Text>
  </SectionHeader>
);

const MemoizedOption = <T,>({
  handlePressItem,
  labelExtractor,
  item,
  type,
}: IOption<T>): JSX.Element => {
  return React.useMemo(() => {
    const label = labelExtractor(item);
    return (
      <ListItem onPress={() => handlePressItem(item)}>
        <View pointerEvents={'none'}>
          {type === 'multi' ? (
            <Checkbox
              color={'primary'}
              labelPosition={'right'}
              checked={item._checked}
            >
              <StyledTextItemSelect
                fontWeight={item._checked ? 'bold' : 'regular'}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
                {label}
              </StyledTextItemSelect>
            </Checkbox>
          ) : (
            <RadioButton
              color={'primary'}
              labelPosition={'right'}
              checked={item._checked}
            >
              <StyledTextItemSelect
                fontWeight={item._checked ? 'bold' : 'regular'}
                ellipsizeMode={'tail'}
                numberOfLines={1}
              >
                {label}
              </StyledTextItemSelect>
            </RadioButton>
          )}
        </View>
      </ListItem>
    );
  }, [item._checked]);
};

export const Modal = Component;
