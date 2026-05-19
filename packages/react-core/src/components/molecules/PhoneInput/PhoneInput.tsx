import './polyfills';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { TextInput } from 'react-native';
import {
  defaultCountries,
  parseCountry,
  usePhoneInput,
  UsePhoneInputConfig,
} from 'react-international-phone';
import {
  Hint,
  InputContainer,
  InputContainerProps,
  InputElement,
  useInputFocus,
} from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { Text, TextProps } from '../../atoms/Text';
import FlagIcon from './FlagIcon';
import PhoneCountrySelector, {
  PhoneCountrySelectorProps,
} from './PhoneCountrySelector';
import {
  StyledFlagTrigger,
  StyledPhoneInputField,
  StyledPhoneInputRoot,
} from './styled';
import { ParsedCountry } from './types';
import { usePhoneInputChange } from './usePhoneInputChange';

export interface PhoneInputProps
  extends InputContainerProps,
    Omit<UsePhoneInputConfig, 'onChange'> {
  onChange?: (
    phone: string,
    meta: { inputValue: string; country: ParsedCountry }
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  TextComponent?: FC<TextProps>;
  FlagComponent?: FC<{ countryCode: string; dialCode?: string }>;
  CountrySelectorComponent?: FC<PhoneCountrySelectorProps>;
  renderCountrySelector: (
    selector: React.ReactElement,
    blur?: () => void
  ) => React.ReactElement | null;
  requestShowCountrySelector: () => void;
  requestCloseCountrySelector: () => void;
  hasSearch?: boolean;
  searchPlaceholder?: string;
}

const PhoneInput: FC<PhoneInputProps> = ({
  onChange,
  onFocus,
  onBlur,
  disabled,
  hintComponent,
  hint,
  variant = 'default',
  TextComponent = Text,
  FlagComponent = FlagIcon,
  CountrySelectorComponent = PhoneCountrySelector,
  rightComponent,
  style,
  renderCountrySelector,
  requestShowCountrySelector,
  requestCloseCountrySelector,
  hasSearch = true,
  searchPlaceholder,
  countries = defaultCountries,
  label,
  leftComponent,
  borderColor,
  borderColorGradation,
  inputContainerStyle,
  ...phoneConfig
}) => {
  // usePhoneInput attaches DOM keydown listeners to inputRef — not compatible with RN TextInput
  const { inputRef: _inputRef, ...safePhoneConfig } = phoneConfig;
  const textInputRef = useRef<TextInput>(null);

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
      ...safePhoneConfig,
    });

  const handleShowCountrySelector = useCallback(() => {
    if (disabled) return;
    requestShowCountrySelector();
  }, [disabled, requestShowCountrySelector]);

  const handleSelectCountry = useCallback(
    (selected: ParsedCountry) => {
      setCountry(selected.iso2);
      requestCloseCountrySelector();
    },
    [setCountry, requestCloseCountrySelector]
  );

  const handleInputChange = usePhoneInputChange(
    inputValue,
    handlePhoneValueChange
  );

  const _hint = hintComponent || (
    <Hint TextComponent={TextComponent} text={hint} variant={variant} />
  );

  const countrySelector = (
    <CountrySelectorComponent
      selectedCountry={country}
      onSelectCountry={handleSelectCountry}
      hasSearch={hasSearch}
      searchPlaceholder={searchPlaceholder}
      TextComponent={TextComponent}
      countries={parsedCountries}
    />
  );

  return (
    <>
      <StyledPhoneInputRoot style={style}>
        <InputContainer
          label={label}
          LabelComponent={TextComponent}
          leftComponent={leftComponent}
          rightComponent={
            <>
              <StyledFlagTrigger
                onPress={handleShowCountrySelector}
                disabled={disabled}
                effect="none"
              >
                {country ? (
                  <FlagComponent
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
              </StyledFlagTrigger>
              {rightComponent}
            </>
          }
          focused={focused}
          disabled={disabled}
          variant={variant}
          borderColor={borderColor}
          borderColorGradation={borderColorGradation}
          inputContainerStyle={inputContainerStyle}
        >
          <StyledPhoneInputField>
            <InputElement
              ref={textInputRef}
              value={inputValue}
              onChange={handleInputChange}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ width: '100%' }}
            />
          </StyledPhoneInputField>
        </InputContainer>
        {hint && _hint}
      </StyledPhoneInputRoot>
      {renderCountrySelector(countrySelector, handleBlur)}
    </>
  );
};

export default PhoneInput;
