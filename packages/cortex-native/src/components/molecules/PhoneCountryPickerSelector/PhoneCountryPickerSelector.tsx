import React, { FC, useMemo } from 'react';
import { Dimensions, useWindowDimensions, View } from 'react-native';
import Text from '../../atoms/Text/Text';
import Header from '../Header/Header';
import PhoneCountrySelector, {
  PhoneCountrySelectorProps,
} from '../PhoneInput/PhoneCountrySelector';

const DRAWER_HEIGHT_RATIO = 0.55;
const DRAWER_MIN_HEIGHT = 320;
const TITLE_BLOCK_HEIGHT = 60;
const SEARCH_BLOCK_HEIGHT = 76;

const getEffectiveWindowHeight = (windowHeight: number) => {
  if (windowHeight > 0) {
    return windowHeight;
  }

  return Dimensions.get('window').height;
};

export interface PhoneCountryPickerSelectorProps
  extends PhoneCountrySelectorProps {
  title?: string;
  onClose?: () => void;
}

const PhoneCountryPickerSelector: FC<PhoneCountryPickerSelectorProps> = ({
  title,
  onClose,
  hasSearch = true,
  ...rest
}) => {
  void onClose;
  const { height: windowHeight } = useWindowDimensions();

  const { drawerHeight, listHeight } = useMemo(() => {
    const effectiveHeight = getEffectiveWindowHeight(windowHeight);
    const drawer = Math.max(
      Math.round(effectiveHeight * DRAWER_HEIGHT_RATIO),
      DRAWER_MIN_HEIGHT
    );
    const titleBlock = title ? TITLE_BLOCK_HEIGHT : 0;
    const searchBlock = hasSearch ? SEARCH_BLOCK_HEIGHT : 0;
    const list = Math.max(drawer - titleBlock - searchBlock, 180);

    return { drawerHeight: drawer, listHeight: list };
  }, [windowHeight, title, hasSearch]);

  return (
    <View
      className="w-full flex-col bg-surface-base"
      style={{ height: drawerHeight }}
    >
      {title ? (
        <Header>
          <Text typography="h4" fontWeight="bold" numberOfLines={2}>
            {title}
          </Text>
        </Header>
      ) : null}
      <PhoneCountrySelector {...rest} hasSearch={hasSearch} listHeight={listHeight} />
    </View>
  );
};

export default PhoneCountryPickerSelector;
