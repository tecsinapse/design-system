import { HintInputContainer } from '@tecsinapse/react-core';
import React from 'react';
import { Text } from '../../atoms/Text';
import { Modal } from './components/Modal';
import { SelectIcon, StyledSelectionText } from './styled';
import useSelect from './hooks/useSelect';
import { SelectNativeProps, SelectType } from './types';

function Select<Data, Type extends SelectType>(
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
    modal,
    selectOptions,
    keyExtractor,
    labelExtractor,
    value,
    handleOnSearch,
    loading,
    options,
    setSelectOptions,
    handleBlur,
    handlePressInput,
    getDisplayValue,
    focused,
    disabled,
    _label,
    ...rest
  } = useSelect(props);

  modal.sync(
    <Modal
      options={selectOptions ?? []}
      focused={true}
      keyExtractor={keyExtractor}
      labelExtractor={labelExtractor}
      groupLabelExtractor={groupLabelExtractor}
      searchBarPlaceholder={searchBarPlaceholder}
      type={type}
      onSelect={onSelect}
      value={value}
      hideSearchBar={hideSearchBar}
      onSearch={handleOnSearch}
      selectModalTitle={selectModalTitle}
      selectModalTitleComponent={selectModalTitleComponent}
      confirmButtonText={confirmButtonText}
      loading={loading}
      onClose={() => {
        if (typeof options === 'function') {
          setSelectOptions([]);
        }
        handleBlur();
      }}
      closeOnPick={closeOnPick}
    />
  );

  return (
    <>
      {controlComponent ? (
        controlComponent(handlePressInput, getDisplayValue() ?? '')
      ) : (
        <HintInputContainer
          {...rest}
          viewStyle={style}
          onPress={handlePressInput}
          focused={focused}
          disabled={disabled}
          LabelComponent={Text}
          variant={variant}
          hint={hint}
          hintComponent={hintComponent}
          label={_label}
          rightComponent={
            <>
              <SelectIcon name="chevron-down" type="ionicon" size="centi" />
              {rightComponent}
            </>
          }
        >
          <StyledSelectionText
            numberOfLines={numberOfLines}
            fontWeight="bold"
            disabled={disabled}
          >
            {getDisplayValue() ?? ' '}
          </StyledSelectionText>
        </HintInputContainer>
      )}
    </>
  );
}

export default Select;
