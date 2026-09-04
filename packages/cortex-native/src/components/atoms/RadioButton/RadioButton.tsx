import React, { ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Icon from '../Icon/Icon';
import { colorToneBorder } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';

export interface RadioButtonProps extends ViewProps {
  /** Element is checked */
  checked?: boolean;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Position of children */
  labelPosition?: 'left' | 'right';
  /** Element is not clickable */
  disabled?: boolean;
  /** Color definition from theme */
  color?: ColorType;
  /** Color gradation from theme */
  colorTone?: ColorGradationType;
  children?: ReactNode;
}

const RadioButton = ({
  children,
  onChange,
  checked,
  labelPosition = 'right',
  disabled = false,
  color = 'primary',
  colorTone = 'medium',
  style,
  testID,
  className,
  ...rest
}: RadioButtonProps): React.ReactElement => {
  const handleChange = () => {
    onChange?.(!checked);
  };

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={handleChange}
      accessibilityRole="radio"
      accessibilityState={{ checked: !!checked, disabled }}
      style={style}
      testID={testID}
      className={cn(className)}
    >
      <View className="flex-row items-center">
        {labelPosition === 'left' && children}
        <View className="p-mili">
          <View
            className={cn(
              'rounded-pill border-nano bg-surface-overlay',
              colorToneBorder[color][colorTone]
            )}
          >
            <View className="scale-[0.8]">
              <Icon
                name="circle"
                colorVariant={checked ? color : undefined}
                colorTone={checked ? colorTone : undefined}
                fontColor={checked ? undefined : 'minimal'}
                type="material-community"
                size="centi"
              />
            </View>
          </View>
        </View>
        {labelPosition === 'right' && children}
      </View>
    </Pressable>
  );
};

export default RadioButton;
