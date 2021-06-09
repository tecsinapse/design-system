import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorGradationType, ColorType } from '../../../types/defaults';
import { ButtonSizeType } from '../Button';
import {
  StyledDivider,
  StyledGroupButton,
  StyledOption,
  StyledPressable,
} from './styled';

export interface GroupButtonOptions {
  activeBackgroundColor?: ColorType;
  activeBackgroundColorTone?: ColorGradationType;
  activeBorderColor?: ColorType;
  activeBorderColorTone?: ColorGradationType;
  inactiveBackgroundColor?: ColorType;
  inactiveBackgroundColorTone?: ColorGradationType;
  inactiveBorderColor?: ColorType;
  inactiveBorderColorTone?: ColorGradationType;
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
}

export interface GroupButtonValue<T> {
  value: T;
  options?: GroupButtonOptions;
}

export interface GroupButtonProps<T> {
  value: T;
  options: GroupButtonValue<T>[];
  renderKey: (option?: T) => any;
  renderOption: (option: T, active: boolean) => JSX.Element;
  onChange: (option: T) => void;
  buttonSize?: ButtonSizeType;
  style?: StyleProp<ViewStyle>;
}

const GroupButton = <T extends any>({
  style,
  ...rest
}: GroupButtonProps<T>) => {
  return (
    <StyledGroupButton style={style}>{groupOptions(rest)}</StyledGroupButton>
  );
};

const groupOptions = <T extends any>({
  options,
  renderOption,
  renderKey,
  onChange,
  value,
  ...rest
}: Partial<GroupButtonProps<T>>) => {
  return options?.map((option, idx) => {
    const {
      value: optionValue,
      options: { activeStyle, inactiveStyle } = {},
    } = option;
    const key = renderKey?.(optionValue);
    const active = key === renderKey?.(value);
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;
    return (
      <StyledOption key={key}>
        <StyledPressable
          {...rest}
          {...option.options}
          isActive={active}
          isFirstOption={isFirst}
          isLastOption={isLast}
          onPress={() => onChange?.(optionValue)}
          style={active ? activeStyle : inactiveStyle}
        >
          {renderOption?.(option.value, active)}
        </StyledPressable>
        {!isLast && <StyledDivider />}
      </StyledOption>
    );
  });
};

export default GroupButton;
