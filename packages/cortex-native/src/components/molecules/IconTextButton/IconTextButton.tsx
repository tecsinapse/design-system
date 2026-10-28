import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { buttonStyles } from '../../../styles/button';
import Icon, { IconProps } from '../../atoms/Icon/Icon';
import Text, { TextProps } from '../../atoms/Text/Text';
import { FontColorType } from '../../../styles/types';

export type IconPositionOptions = 'left' | 'right';

export interface IconTextButtonProps extends PressableProps {
  iconProps?: IconProps;
  iconPosition?: IconPositionOptions;
  textProps?: TextProps;
  label?: string;
  intent?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'default';
}

const fontColorVC: Record<'filled' | 'outlined' | 'text', FontColorType> = {
  filled: 'light',
  outlined: 'orange',
  text: 'orange',
};

const nativeVariant: Record<
  'filled' | 'outlined' | 'text',
  'filled' | 'outline' | 'text'
> = {
  filled: 'filled',
  outlined: 'outline',
  text: 'text',
};

const TextComponent: React.FC<{
  textProps?: TextProps;
  size?: 'small' | 'default';
  defaultFontColor: FontColorType;
  label?: string;
  iconPosition?: IconPositionOptions;
  hasIcon?: boolean;
}> = ({
  textProps,
  size = 'default',
  defaultFontColor,
  label,
  iconPosition = 'left',
  hasIcon = false,
}) => {
  if (!label) return <></>;
  return (
    <Text
      typography={textProps?.typography ?? (size === 'small' ? 'sub' : 'base')}
      fontWeight={textProps?.fontWeight ?? 'bold'}
      fontColor={textProps?.fontColor ?? defaultFontColor}
      style={
        hasIcon
          ? iconPosition === 'left'
            ? { marginLeft: 8 }
            : { marginRight: 8 }
          : undefined
      }
      {...textProps}
    >
      {label}
    </Text>
  );
};

const IconTextButton: React.FC<IconTextButtonProps> = ({
  iconProps,
  iconPosition = 'left',
  textProps,
  label,
  variant = 'filled',
  size = 'default',
  intent = 'primary',
  onPress,
  disabled = false,
  style,
  testID,
  className,
  ...rest
}) => {
  const boxed = !label;
  const defaultFontColor = fontColorVC[variant];
  const buttonClassName = cn(
    buttonStyles({ intent, variant: nativeVariant[variant], size }),
    boxed && 'p-centi aspect-square',
    className,
  );

  return (
    <Pressable
      {...rest}
      testID={testID}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={buttonClassName}
      style={state => [
        typeof style === 'function' ? style(state) : style,
        state.pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
      ]}
    >
      {iconPosition === 'left' && iconProps && (
        <Icon
          {...iconProps}
          size={iconProps.size ?? (size === 'small' ? 'mili' : 'centi')}
          fontColor={iconProps.fontColor ?? defaultFontColor}
        />
      )}
      <TextComponent
        label={label}
        defaultFontColor={defaultFontColor}
        hasIcon={!!iconProps}
        iconPosition={iconPosition}
        textProps={textProps}
        size={size}
      />
      {iconPosition === 'right' && iconProps && (
        <Icon
          {...iconProps}
          size={iconProps.size ?? (size === 'small' ? 'mili' : 'centi')}
          fontColor={iconProps.fontColor ?? defaultFontColor}
        />
      )}
    </Pressable>
  );
};

export default IconTextButton;
