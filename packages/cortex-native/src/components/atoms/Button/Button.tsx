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
import { ButtonContext } from './ButtonContext';
import Icon from './Icon';
import Label from './Label';

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonStyles> {
  /**
   * Convenience label. Ignored when `children` is provided.
   * @see Button.Label — composition alternative: `<Button.Root><Button.Label>…`
   */
  title?: string;
  loading?: boolean;
}

const ButtonRoot: React.FC<ButtonProps> = ({
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
      <ButtonContext.Provider value={{ foregroundColor }}>
        {loading ? (
          <ActivityIndicator color={foregroundColor} />
        ) : (
          (children as React.ReactNode) ?? (
            <Text
              fontWeight="bold"
              typography="base"
              style={{ color: foregroundColor }}
            >
              {title}
            </Text>
          )
        )}
      </ButtonContext.Provider>
    </Pressable>
  );
};

ButtonRoot.displayName = 'Button';

const Button = Object.assign(ButtonRoot, { Root: ButtonRoot, Label, Icon });

export default Button;
