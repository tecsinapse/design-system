import React from 'react';
import Confirm from './parts/Confirm';
import Options from './parts/Options';
import Search from './parts/Search';
import Sheet from './parts/Sheet';
import Trigger from './parts/Trigger';
import { SelectContext, SelectContextValue } from './SelectContext';
import useSelect from './hooks/useSelect';
import { SelectNativeProps, SelectType } from './types';

function SelectRoot<Data, Type extends SelectType>(
  props: SelectNativeProps<Data, Type>
): React.ReactElement {
  const {
    groupLabelExtractor,
    onSelect,
    selectModalTitle,
    selectModalTitleComponent,
    searchBarPlaceholder,
    hideSearchBar,
    confirmButtonText,
    rightComponent,
    variant = 'default',
    hintComponent,
    hint,
    style,
    controlComponent,
    type,
    numberOfLines,
    closeOnPick = type === 'single',
    selectOptions,
    keyExtractor,
    labelExtractor,
    value,
    handleOnSearch,
    loading,
    modalVisible,
    handleClose,
    handlePressInput,
    getDisplayValue,
    focused,
    disabled,
    _label,
    ...triggerRest
  } = useSelect(props);

  const contextValue: SelectContextValue<Data> = {
    type,
    value,
    keyExtractor,
    labelExtractor,
    // `SelectNativeProps.onSelect` narrows its argument on `Type`
    // (`Data | undefined` for single, `Data[]` for multi). The context carries
    // the union because it is shared by parts that do not know `Type`; the
    // sheet only ever calls it with the variant `useModal` builds for this
    // `type`, exactly as the pre-compound `Select` did.
    onSelect: onSelect as SelectContextValue<Data>['onSelect'],
    modalVisible,
    handleClose,
    closeOnPick,
    getDisplayValue,
    handlePressInput,
    focused,
    disabled,
    variant,
    hint,
    hintComponent,
    rightComponent,
    style,
    numberOfLines,
    label: _label,
    controlComponent,
    triggerRest,
    selectOptions: selectOptions ?? [],
    loading,
    groupLabelExtractor,
    searchBarPlaceholder,
    hideSearchBar,
    handleOnSearch,
    selectModalTitle,
    selectModalTitleComponent,
    confirmButtonText,
  };

  return (
    // `SelectContext` is typed for `unknown`; this `<Select.Root>` instance
    // provides a value shaped for its own concrete `Data`, matching how
    // `useSelectContext` narrows it back on read (see `SelectContext.tsx`).
    <SelectContext.Provider
      value={contextValue as unknown as SelectContextValue<unknown>}
    >
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue() ?? '')
      ) : (
        <Trigger />
      )}
      <Sheet />
    </SelectContext.Provider>
  );
}

SelectRoot.displayName = 'Select';

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger,
  Sheet,
  Search,
  Options,
  Confirm,
}) as typeof SelectRoot & {
  Root: typeof SelectRoot;
  Trigger: typeof Trigger;
  Sheet: typeof Sheet;
  Search: typeof Search;
  Options: typeof Options;
  Confirm: typeof Confirm;
};

export default Select;
