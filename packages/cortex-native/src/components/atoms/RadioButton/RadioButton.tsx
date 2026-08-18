import React, { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';
import Icon from '../Icon/Icon';
import { colorToneBorder } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';

export interface RadioButtonProps {
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
    >
      <View className="flex-row items-center">
        {labelPosition === 'left' && children}
        <View className="p-mili">
          <View
            className={clsx(
              'rounded-pill border-nano bg-surface-overlay',
              colorToneBorder[color][colorTone],
            )}
          >
            <View className="scale-[0.8]">
              <Icon
                name="circle"
                colorVariant={checked ? color : undefined}
                colorTone={checked ? colorTone : undefined}
                fontColor={checked ? undefined : 'medium'}
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
