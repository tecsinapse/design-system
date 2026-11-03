import React from 'react';
import { View } from 'react-native';
import Text from '../../../atoms/Text/Text';
import Confirm from '../parts/Confirm';
import Options from '../parts/Options';
import Search from '../parts/Search';
import useModal from '../hooks/useModal';
import { LoadingProps, OverrideModalProps, SelectType } from '../types';

const Modal = <Data, Type extends SelectType>(
  props: OverrideModalProps<Data, Type> & LoadingProps & { onClose: () => void }
): React.ReactElement => {
  const {
    hideSearchBar,
    searchBarPlaceholder,
    loading,
    options,
    groupLabelExtractor,
    keyExtractor,
    confirmButtonText,
    emptyText = 'No options available',
    emptySearchText = 'No results found',
  } = props;

  const { searchArg, setSearchArg, getData, renderItem, closeOnPick, handleConfirm } =
    useModal(props);
  const isEmpty =
    options instanceof Map
      ? Array.from(options.values()).every(group => group.length === 0)
      : options.length === 0;

  return (
    <View className="flex-1 w-full flex-col">
      {!hideSearchBar ? (
        <Search
          searchArg={searchArg}
          setSearchArg={setSearchArg}
          searchBarPlaceholder={searchBarPlaceholder}
        />
      ) : null}

      {!loading && isEmpty ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <Text fontColor="low" style={{ textAlign: 'center' }} accessibilityLiveRegion="polite">
            {searchArg.trim() ? emptySearchText : emptyText}
          </Text>
        </View>
      ) : (
        <Options
          options={options}
          getData={getData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          groupLabelExtractor={groupLabelExtractor}
          loading={loading}
        />
      )}

      {!closeOnPick ? (
        <Confirm
          handleConfirm={handleConfirm}
          confirmButtonText={confirmButtonText}
          loading={loading}
        />
      ) : null}
    </View>
  );
};

export const SelectModal = Modal;
