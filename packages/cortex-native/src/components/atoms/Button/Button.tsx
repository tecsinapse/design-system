import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';
import { cn } from '@tecsinapse/cortex-core';
import Text from '../Text/Text';
import {
  buttonStyles,
  getButtonForegroundColorVar,
} from '../../../styles/button';

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  intent = 'primary',
  variant = 'filled',
  size = 'default',
  style,
  className,
  testID,
}) => {
  const foregroundColor = useCSSVariable(
    getButtonForegroundColorVar(intent, variant)
  ) as string | undefined;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(buttonStyles({ intent, variant, size }), className)}
      style={({ pressed }) => [
        style,
        pressed && { opacity: 0.8 },
        (disabled || loading) && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : (
        <Text
          fontWeight="bold"
          typography="base"
          style={{ color: foregroundColor }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
