import { InputContainerProps } from '@tecsinapse/react-core';
import { ListRenderItemInfo } from 'react-native';

export type OptionData<T> = T & { _checked: boolean };

export type SelectType = 'single' | 'multi';

export interface LoadingProps {
  loading?: boolean;
}

type SearchFn<Data> = (
  searchInput?: string
) => Promise<Data[] | Map<string, Data[]>>;

export type Extractor<Data> = (t: Data, index?: number) => string;

export interface SelectNativeProps<Data, Type extends SelectType>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: SearchFn<Data> | Data[] | Map<string, Data[]>;
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | null | undefined : Data[];
  type: Type;

  keyExtractor: Extractor<Data>;
  labelExtractor: Extractor<Data>;
  groupLabelExtractor?: (title: string) => string;

  hideSearchBar?: boolean;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  onSearch?: ((searchArg: string) => void) | SearchFn<Data> | never;
  searchBarPlaceholder?: string;
  confirmButtonText?: string;
  selectModalTitle?: string;
  selectModalTitleComponent?: React.ReactNode;
  closeOnPick?: boolean;
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => React.ReactElement;
  numberOfLines?: number;
}

type BaseList<Data> = {
  renderItem: (item: ListRenderItemInfo<OptionData<Data>>) => React.ReactElement;
  getData: (options: Data[]) => OptionData<Data>[];
  keyExtractor: Extractor<Data>;
};

export type BaseSectionList<Data> = BaseList<Data> & {
  options: Map<string, Data[]>;
  groupLabelExtractor?: (title: string) => string;
};

export type BaseFlatList<Data> = BaseList<Data> & {
  options: Data[];
};

export type OverrideModalProps<Data, Type extends SelectType> = Omit<
  SelectNativeProps<Data, Type>,
  'options'
> & { options: Data[] | Map<string, Data[]> };
