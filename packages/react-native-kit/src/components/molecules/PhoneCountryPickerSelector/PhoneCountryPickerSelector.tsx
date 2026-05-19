import {
  PhoneCountrySelector,
  PhoneCountrySelectorProps,
} from '@tecsinapse/react-core';
import React, { FC, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { Text } from '../../atoms/Text';
import { Divider, TextTitleModal } from '../Select/styled';
import { CountryOption } from './CountryOption';
import { SearchInput } from './SearchInput';
import { CompactSearchBarContainer, CompactTitleHeader, Root } from './styled';

const DRAWER_HEIGHT_RATIO = 0.55;
const TITLE_BLOCK_HEIGHT = 60;
const SEARCH_BLOCK_HEIGHT = 76;

export interface PhoneCountryPickerSelectorProps
  extends PhoneCountrySelectorProps {
  title?: string;
  onClose?: () => void;
}

const PhoneCountryPickerSelector: FC<PhoneCountryPickerSelectorProps> = ({
  title,
  onClose,
  hasSearch = true,
  TextComponent = Text,
  ...rest
}) => {
  const { height: windowHeight } = useWindowDimensions();

  const { drawerHeight, listHeight } = useMemo(() => {
    const drawer = Math.round(windowHeight * DRAWER_HEIGHT_RATIO);
    const titleBlock = title ? TITLE_BLOCK_HEIGHT : 0;
    const searchBlock = hasSearch ? SEARCH_BLOCK_HEIGHT : 0;
    const list = Math.max(drawer - titleBlock - searchBlock, 180);

    return { drawerHeight: drawer, listHeight: list };
  }, [windowHeight, title, hasSearch]);

  return (
    <Root style={{ height: drawerHeight }}>
      {title ? (
        <CompactTitleHeader>
          <TextTitleModal typography="h4" fontWeight="bold">
            {title}
          </TextTitleModal>
        </CompactTitleHeader>
      ) : null}
      <PhoneCountrySelector
        {...rest}
        hasSearch={hasSearch}
        listHeight={listHeight}
        TextComponent={TextComponent}
        SearchInputComponent={props => (
          <CompactSearchBarContainer>
            <SearchInput {...props} />
          </CompactSearchBarContainer>
        )}
        CountryOptionComponent={CountryOption}
        ItemSeparatorComponent={Divider}
      />
    </Root>
  );
};

export default PhoneCountryPickerSelector;
