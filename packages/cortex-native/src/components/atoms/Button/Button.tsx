import React from 'react';
import { Pressable, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { buttonStyles } from '../../../styles/button';

export interface ButtonProps extends VariantProps<typeof buttonStyles> {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
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
  testID,
}) => (
  <Pressable
    testID={testID}
    accessibilityRole="button"
    disabled={disabled || loading}
    onPress={onPress}
    className={buttonStyles({ intent, variant, size })}
    style={({ pressed }) => [
      style,
      pressed && { opacity: 0.8 },
      (disabled || loading) && { opacity: 0.5 },
    ]}
  >
    {loading ? <ActivityIndicator color="#fff" /> : title}
  </Pressable>
);

export default Button;
