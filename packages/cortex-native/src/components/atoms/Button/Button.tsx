import React from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';
import { cn } from '@tecsinapse/cortex-core';
import Text from '../Text/Text';
import {
  buttonStyles,
  getButtonForegroundColorVar,
} from '../../../styles/button';

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonStyles> {
  /** Convenience label. Ignored when `children` is provided. */
  title?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  children,
  disabled = false,
  loading = false,
  intent = 'primary',
  variant = 'filled',
  size = 'default',
  className,
  style,
  ...rest
}) => {
  const foregroundColor = useCSSVariable(
    getButtonForegroundColorVar(intent, variant)
  ) as string | undefined;

  return (
    <Pressable
      {...rest}
      accessibilityRole="button"
      disabled={disabled || loading}
      className={cn(buttonStyles({ intent, variant, size }), className)}
      style={state => [
        typeof style === 'function' ? style(state) : style,
        state.pressed && { opacity: 0.8 },
        (disabled || loading) && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : (
        children ?? (
          <Text
            fontWeight="bold"
            typography="base"
            style={{ color: foregroundColor }}
          >
            {title}
          </Text>
        )
      )}
    </Pressable>
  );
};

export default Button;
