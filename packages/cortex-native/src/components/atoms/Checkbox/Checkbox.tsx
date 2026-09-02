import React, { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import Icon from '../Icon/Icon';
import { colorToneBg, colorToneBorder } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';

export interface CheckboxProps {
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
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  className?: string;
}

const Checkbox = ({
  children,
  checked,
  onChange,
  color = 'primary',
  colorTone = 'medium',
  labelPosition = 'left',
  disabled = false,
  style,
  testID,
  className,
  ...rest
}: CheckboxProps): React.ReactElement => {
  const handleChange = () => {
    onChange?.(!checked);
  };

  const boxClass = cn(
    'rounded-micro border-nano',
    colorToneBorder[color][colorTone],
    checked ? colorToneBg[color][colorTone] : 'bg-surface-overlay'
  );

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPress={handleChange}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked, disabled }}
      style={style}
      testID={testID}
      className={cn(className)}
    >
      <View className="flex-row items-center">
        {labelPosition === 'left' && children}
        <View className="p-mili">
          <View className={boxClass}>
            <Icon
              name={checked ? 'check' : 'checkbox-blank'}
              fontColor={checked ? 'inverse' : 'minimal'}
              type="material-community"
              size="centi"
            />
          </View>
        </View>
        {labelPosition === 'right' && children}
      </View>
    </Pressable>
  );
};

export default Checkbox;
