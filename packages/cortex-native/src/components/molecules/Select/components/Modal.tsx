import React from 'react';
import { View } from 'react-native';
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
  } = props;

  const { searchArg, setSearchArg, getData, renderItem, closeOnPick, handleConfirm } =
    useModal(props);

  return (
    <View className="flex-1 w-full flex-col">
      {!hideSearchBar ? (
        <Search
          searchArg={searchArg}
          setSearchArg={setSearchArg}
          searchBarPlaceholder={searchBarPlaceholder}
        />
      ) : null}

      <Options
        options={options}
        getData={getData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        groupLabelExtractor={groupLabelExtractor}
        loading={loading}
      />

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
