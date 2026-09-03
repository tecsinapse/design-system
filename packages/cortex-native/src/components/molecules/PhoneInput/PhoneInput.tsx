import './polyfills';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import type { ParsedCountry } from 'react-international-phone';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
  UsePhoneInputConfig,
} from 'react-international-phone';
import { useBottomSafeAreaInset } from '../../../hooks/useBottomSafeAreaInset';
import Input from '../../atoms/Input/Input';
import {
  InputContainerProps,
  InputVariantType,
} from '../../atoms/Input/InputContainer';
import { useInputFocus } from '../../atoms/Input/useInputFocus';
import Icon from '../../atoms/Icon/Icon';
import Text from '../../atoms/Text/Text';
import PressableSurface from '../../atoms/PressableSurface/PressableSurface';
import { FlagIcon } from './FlagIcon';
import PhoneCountrySelector from './PhoneCountrySelector';
import { usePhoneInputChange } from './usePhoneInputChange';

export interface PhoneInputProps
  extends
    Omit<InputContainerProps, 'focused' | 'disabled' | 'variant'>,
    Omit<UsePhoneInputConfig, 'onChange' | 'inputRef'> {
  onChange?: (
    phone: string,
    meta: { inputValue: string; country: ParsedCountry }
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  variant?: InputVariantType;
  countryModalTitle?: string;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const DRAWER_HEIGHT_RATIO = 0.75;
const DRAWER_MIN_HEIGHT = 320;
const HANDLE_BLOCK_HEIGHT = 29;
const TITLE_BLOCK_HEIGHT = 60;
const SEARCH_BLOCK_HEIGHT = 76;
const MIN_LIST_HEIGHT = 180;

const PhoneInput: FC<PhoneInputProps> = ({
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  hint,
  hintComponent,
  variant = 'default',
  rightComponent,
  style,
  countries = defaultCountries,
  label,
  leftComponent,
  borderColor,
  borderColorGradation,
  inputContainerStyle,
  inputContainerTestID,
  countryModalTitle,
  hasSearch = true,
  searchPlaceholder,
  placeholder,
  ...phoneConfig
}) => {
  const bottomInset = useBottomSafeAreaInset();
  const { height: windowHeight } = useWindowDimensions();

  const { drawerHeight, listHeight } = useMemo(() => {
    const drawer = Math.max(
      Math.round(windowHeight * DRAWER_HEIGHT_RATIO),
      DRAWER_MIN_HEIGHT
    );
    const header =
      HANDLE_BLOCK_HEIGHT +
      (countryModalTitle ? TITLE_BLOCK_HEIGHT : 0) +
      (hasSearch ? SEARCH_BLOCK_HEIGHT : 0);
    const list = Math.max(drawer - header - bottomInset, MIN_LIST_HEIGHT);

    return { drawerHeight: drawer, listHeight: list };
  }, [windowHeight, countryModalTitle, hasSearch, bottomInset]);
  const textInputRef = useRef<TextInput>(null);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const { focused, handleBlur, handleFocus } = useInputFocus(
    onFocus,
    onBlur,
    !disabled
  );

  const parsedCountries = useMemo(
    () => countries.map(country => parseCountry(country)),
    [countries]
  );

  const { country, handlePhoneValueChange, inputValue, setCountry } =
    usePhoneInput({
      countries,
      onChange: data => {
        onChange?.(data.phone, {
          inputValue: data.inputValue,
          country: data.country,
        });
      },
      ...phoneConfig,
    });

  const handleShowCountrySelector = useCallback(() => {
    if (disabled) return;
    setSelectorOpen(true);
  }, [disabled]);

  const handleCloseCountrySelector = useCallback(() => {
    setSelectorOpen(false);
  }, []);

  const handleSelectCountry = useCallback(
    (selected: ParsedCountry) => {
      setCountry(selected.iso2);
      handleCloseCountrySelector();
    },
    [setCountry, handleCloseCountrySelector]
  );

  const handleInputChange = usePhoneInputChange(
    inputValue,
    handlePhoneValueChange
  );

  const _hint = hintComponent || <Input.Hint text={hint} variant={variant} />;
  return (
    <>
      <View style={style} className="w-full">
        <Input.Face
          label={label}
          LabelComponent={Text}
          leftComponent={leftComponent}
          rightComponent={
            <>
              <PressableSurface
                onPress={handleShowCountrySelector}
                disabled={disabled}
                effect="none"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexShrink: 0,
                  minWidth: 56,
                  paddingLeft: 8,
                  gap: 8,
                }}
              >
                {country ? (
                  <FlagIcon
                    countryCode={country.iso2}
                    dialCode={country.dialCode}
                  />
                ) : null}
                <Icon
                  name="chevron-down"
                  type="ionicon"
                  size="centi"
                  colorVariant="secondary"
                />
              </PressableSurface>
              {rightComponent}
            </>
          }
          focused={focused}
          disabled={disabled}
          variant={variant}
          borderColor={borderColor}
          borderColorGradation={borderColorGradation}
          inputContainerStyle={inputContainerStyle}
          inputContainerTestID={inputContainerTestID}
        >
          <Input.Box
            ref={textInputRef}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Input.Face>
        {hint && _hint}
      </View>

      <Modal
        visible={selectorOpen}
        transparent
        animationType="slide"
        onRequestClose={handleCloseCountrySelector}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onPress={handleCloseCountrySelector}
          >
            <View className="bg-black/60" style={{ flex: 1 }} />
          </Pressable>
          <View
            className="bg-surface-overlay rounded-t-deca"
            style={{ height: drawerHeight, paddingBottom: bottomInset }}
          >
            <View className="items-center py-micro">
              <View
                className="bg-secondary-light rounded-full"
                style={{ width: 42, height: 5 }}
              />
            </View>
            {countryModalTitle ? (
              <View className="px-deca py-centi">
                <Text typography="h4" fontWeight="bold">
                  {countryModalTitle}
                </Text>
              </View>
            ) : null}
            <PhoneCountrySelector
              selectedCountry={country}
              onSelectCountry={handleSelectCountry}
              hasSearch={hasSearch}
              searchPlaceholder={searchPlaceholder}
              countries={parsedCountries}
              listHeight={listHeight}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PhoneInput;
