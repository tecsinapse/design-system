import React from 'react';
import { Pressable, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { colorToneBg, colorToneBorder } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';

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

export interface GroupButtonProps<T> extends ViewProps {
  value: T;
  options: GroupButtonValue<T>[];
  renderKey: (option?: T) => string | number | undefined;
  renderOption: (option: T, active: boolean) => React.ReactElement;
  onChange: (option: T) => void;
  buttonSize?: 'small' | 'default';
  disableAllOptions?: boolean;
}

const sizeClass: Record<'small' | 'default', string> = {
  small: 'px-deca py-mili min-h-[34px]',
  default: 'px-kilo py-mili min-h-[44px]',
};

const groupOptions = <T,>({
  options,
  renderOption,
  renderKey,
  onChange,
  value,
  disableAllOptions,
  buttonSize = 'small',
}: Partial<GroupButtonProps<T>>) => {
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
        activeBorderColor,
        activeBorderColorTone,
        inactiveBorderColor,
        inactiveBorderColorTone,
        disabled = disableAllOptions || option.options?.disabled,
      } = {},
    } = option;

    const key = renderKey?.(optionValue);
    const active = key === renderKey?.(value);
    const isFirst = idx === 0;
    const isLast = idx === options.length - 1;

    const bgClass =
      disabled && !active
        ? 'bg-[#dcdcdc]'
        : active
          ? colorToneBg[activeBackgroundColor || 'secondary'][
              activeBackgroundColorTone || 'medium'
            ]
          : inactiveBackgroundColor || inactiveBackgroundColorTone
            ? colorToneBg[inactiveBackgroundColor || 'secondary'][
                inactiveBackgroundColorTone || 'medium'
              ]
            : 'bg-surface-overlay';

    const borderClass = active
      ? colorToneBorder[activeBorderColor || 'secondary'][
          activeBorderColorTone || 'medium'
        ]
      : colorToneBorder[inactiveBorderColor || 'secondary'][
          inactiveBorderColorTone || 'light'
        ];

    return (
      <View key={key} className="flex-row flex-1">
        <Pressable
          disabled={disabled}
          onPress={() => onChange?.(optionValue)}
          className={cn(
            'flex-1 justify-center items-center border-t border-b',
            borderClass,
            bgClass,
            sizeClass[buttonSize],
            isFirst && 'border-l rounded-l-mili',
            isLast && 'border-r rounded-r-mili',
          )}
          style={active ? activeStyle : inactiveStyle}
        >
          {renderOption?.(option.value, active)}
        </Pressable>
        {!isLast && <View className="w-[0.063rem] bg-secondary-light" />}
      </View>
    );
  });
};

const GroupButton = <T,>({
  style,
  className,
  value,
  options,
  renderKey,
  renderOption,
  onChange,
  buttonSize,
  disableAllOptions,
  ...rest
}: GroupButtonProps<T>) => {
  return (
    <View
      {...rest}
      style={style}
      className={cn('flex-row', className)}
    >
      {groupOptions({
        value,
        options,
        renderKey,
        renderOption,
        onChange,
        buttonSize,
        disableAllOptions,
      })}
    </View>
  );
};

export default GroupButton;
