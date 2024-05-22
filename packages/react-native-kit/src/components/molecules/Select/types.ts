import { InputContainerProps } from '@tecsinapse/react-core';

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
  groupKeyExtractor?: Extractor<Data>;

  hideSearchBar?: boolean;
  placeholder?: string;
  onFocus?: () => void | never;
  onBlur?: () => void | never;
  onSearch?: ((searchArg: string) => void) | SearchFn<Data> | never;
  searchBarPlaceholder?: string;
  confirmButtonText?: string;
  selectModalTitle?: string;
  selectModalTitleComponent?: JSX.Element;
  closeOnPick?: boolean;
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => JSX.Element;
  numberOfLines?: number;
}
