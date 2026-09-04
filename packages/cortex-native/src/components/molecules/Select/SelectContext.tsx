import { createContext, useContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { InputVariantType } from '../../atoms/Input/InputContainer';
import { HintInputContainerProps } from '../HintInputContainer/HintInputContainer';
import { Extractor, SelectType } from './types';

/**
 * Leftover `InputContainer`/`PressableInputContainer` props a consumer may
 * pass straight through to `<Select>` (label styling, left/right decoration,
 * accessibility, etc). `Select.Trigger` forwards these to `HintInputContainer`
 * unmodified.
 */
export type SelectTriggerRestProps = Omit<
  HintInputContainerProps,
  | 'viewStyle'
  | 'onPress'
  | 'focused'
  | 'disabled'
  | 'LabelComponent'
  | 'variant'
  | 'hint'
  | 'hintComponent'
  | 'rightComponent'
  | 'children'
>;

export interface SelectContextValue<Data = unknown> {
  // shared open/select state
  type: SelectType;
  value: Data | Data[] | null | undefined;
  keyExtractor: Extractor<Data>;
  labelExtractor: Extractor<Data>;
  onSelect: (option: Data | Data[] | undefined) => void;
  modalVisible: boolean;
  handleClose: () => void;
  closeOnPick: boolean;

  // trigger display
  getDisplayValue: () => string | undefined;
  handlePressInput: () => void | Promise<void>;
  focused: boolean;
  disabled?: boolean;
  variant: InputVariantType;
  hint?: string;
  hintComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  numberOfLines?: number;
  label?: string;
  controlComponent?: (
    onPress: () => void,
    displayValue?: string
  ) => React.ReactElement;
  triggerRest: SelectTriggerRestProps;

  // sheet content (search / options / confirm, fed to the rebuilt SelectModal)
  selectOptions: Data[] | Map<string, Data[]>;
  loading?: boolean;
  groupLabelExtractor?: (title: string) => string;
  searchBarPlaceholder?: string;
  hideSearchBar?: boolean;
  handleOnSearch: (searchInput: string | undefined) => void | Promise<void>;
  selectModalTitle?: string;
  selectModalTitleComponent?: React.ReactNode;
  confirmButtonText?: string;
}

export const SelectContext = createContext<
  SelectContextValue<unknown> | undefined
>(undefined);

export const useSelectContext = <Data = unknown,>(): SelectContextValue<Data> => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select parts must be used within <Select.Root>');
  }
  // `SelectContext` is necessarily typed for `unknown` since it is created once
  // for every `Data` a consumer's `<Select.Root>` may render with; the provider
  // (`Select.tsx`) always supplies a value matching its own concrete `Data`, so
  // narrowing back to the caller's `Data` here is safe.
  return context as unknown as SelectContextValue<Data>;
};
