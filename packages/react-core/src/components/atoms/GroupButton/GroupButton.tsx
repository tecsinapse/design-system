import { useTheme } from '@emotion/react';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '../../../types/defaults';
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
  disabled?: boolean;
}

export interface GroupButtonValue<T> {
  value: T;
  options?: GroupButtonOptions;
}

export interface GroupButtonProps<T> {
  value: T;
  options: GroupButtonValue<T>[];
  renderKey: (option?: T) => string | number | undefined;
  renderOption: (option: T, active: boolean) => JSX.Element;
  onChange: (option: T) => void;
  buttonSize?: ButtonSizeType;
  style?: StyleProp<ViewStyle>;
  disableAllOptions?: boolean;
}

const GroupButton = <T extends unknown>({
  style,
  ...rest
}: GroupButtonProps<T>) => {
  return (
    <StyledGroupButton style={style}>{groupOptions(rest)}</StyledGroupButton>
  );
};

const groupOptions = <T extends unknown>({
  options,
  renderOption,
  renderKey,
  onChange,
  value,
  disableAllOptions,
  ...rest
}: Partial<GroupButtonProps<T>>) => {
  const theme = useTheme() as ThemeProp;
  return options?.map((option, idx) => {
    const {
      value: optionValue,
      options: {
        activeStyle,
        inactiveStyle,
        activeBackgroundColor,
        activeBackgroundColorTone,
        inactiveBackgroundColor,
        inactiveBackgroundColorTone,
        disabled = disableAllOptions || option.options?.disabled,
      } = {},
    } = option;

    const key = renderKey?.(optionValue);
    const active = key === renderKey?.(value);
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;

    let colors = theme.miscellaneous.surfaceColor;
    if (active) {
      colors =
        theme.color[activeBackgroundColor || 'secondary'][
          activeBackgroundColorTone || 'medium'
        ];
    }

    if (!active && (inactiveBackgroundColor || inactiveBackgroundColorTone)) {
      colors =
        theme.color[inactiveBackgroundColor || 'secondary'][
          inactiveBackgroundColorTone || 'medium'
        ];
    }

    return (
      <StyledOption key={key}>
        <StyledPressable
          {...rest}
          {...option.options}
          disabled={disabled}
          isActive={active}
          isFirstOption={isFirst}
          isLastOption={isLast}
          onPress={() => onChange?.(optionValue)}
          surfaceColor={colors}
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
