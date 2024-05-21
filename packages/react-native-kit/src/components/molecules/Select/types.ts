import { InputContainerProps } from '@tecsinapse/react-core';

export type OptionData<T> = T & { _checked: boolean };

export interface LoadingProps {
  loading?: boolean;
}

export interface SelectNativeProps<Data, Type extends 'single' | 'multi'>
  extends Omit<InputContainerProps, 'value' | 'onChange' | 'onChangeText'> {
  options:
    | ((searchInput?: string) => Promise<Data[] | Map<string, Data[]>>)
    | Data[]
    | Map<string, Data[]>;
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
  onSearch?:
    | ((searchArg: string) => void)
    | ((searchInput?: string) => Promise<Data[]>)
    | never;
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
