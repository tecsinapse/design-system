import React, { useCallback, useRef, useState } from 'react';
import { Animated, Pressable, View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { colorToneBg } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';
import Icon, { IconProps } from '../Icon/Icon';
import Text from '../Text/Text';

export interface TagProps extends ViewProps {
  value: React.ReactNode;
  icon?: IconProps;
  dismiss?: boolean;
  onDismiss?: () => void;
  variant?: 'small' | 'default';
  backgroundColorTone?: ColorType;
  backgroundColorVariant?: ColorGradationType;
}

const variantClass: Record<'small' | 'default', string> = {
  small: 'rounded-micro px-mili py-nano',
  default: 'rounded-mili px-centi py-micro',
};

const Tag: React.FC<TagProps> = ({
  value,
  icon,
  variant = 'small',
  dismiss: canDismiss = false,
  onDismiss,
  style,
  backgroundColorTone = 'secondary',
  backgroundColorVariant = 'xlight',
  testID,
  className,
  ...rest
}) => {
  const [dismiss, setDismiss] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const duration = 300;

  const handleDismiss = useCallback(() => {
    onDismiss?.();
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => setDismiss(true));
  }, [onDismiss, fadeAnim]);

  if (dismiss) {
    return null;
  }

  const tagClassName = cn(
    'flex-row justify-center items-center self-center',
    variantClass[variant],
    colorToneBg[backgroundColorTone][backgroundColorVariant],
    className,
  );

  return (
    <Animated.View
      testID={testID}
      className={tagClassName}
      style={[{ opacity: fadeAnim }, style]}
      {...rest}
    >
      {icon && (
        <View className="mr-micro">
          <Icon
            size={icon.size || 'micro'}
            colorVariant={icon.colorVariant || 'primary'}
            {...icon}
          />
        </View>
      )}
      {typeof value === 'string' ? <Text>{value}</Text> : value}
      {canDismiss && (
        <Pressable
          onPress={handleDismiss}
          accessibilityRole="button"
          style={{ marginLeft: 2 }}
          hitSlop={8}
        >
          <Icon
            name="close-outline"
            type="ionicon"
            size="centi"
            fontColor="medium"
          />
        </Pressable>
      )}
    </Animated.View>
  );
};

export default Tag;
