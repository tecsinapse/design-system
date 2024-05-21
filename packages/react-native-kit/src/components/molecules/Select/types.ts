import { InputContainerProps } from '@tecsinapse/react-core';

export type OptionData<T> = T & { _checked: boolean };

export interface LoadingProps {
  loading?: boolean;
}

type SearchFn<Data> = (
  searchInput?: string
) => Promise<Data[] | Map<string, Data[]>>;

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options: SearchFn<Data> | Data[] | Map<string, Data[]>;
  onSelect: (
    option: Type extends 'single' ? Data | undefined : Data[]
  ) => never | void;
  value: Type extends 'single' ? Data | null | undefined : Data[];
  type: Type;

  keyExtractor: (t: Data, index?: number) => string;
  labelExtractor: (t: Data) => string;
  groupKeyExtractor?: (t: Data) => string;

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
