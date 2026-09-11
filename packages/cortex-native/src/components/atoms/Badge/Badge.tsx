import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { clsx } from 'clsx';
import { colorToneBg } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';
import Text from '../Text/Text';

export interface BadgeProps {
  color?: ColorType;
  tone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  value: React.ReactNode;
  children?: ReactNode;
}

const Badge = ({
  children,
  style,
  color = 'primary',
  tone = 'medium',
  value,
}: BadgeProps): React.ReactElement => {
  const renderedValue =
    typeof value === 'string' || typeof value === 'number' ? (
      <Text fontWeight="bold" typography="label">
        {value}
      </Text>
    ) : (
      value
    );

  return (
    <View className="relative items-center justify-center self-center">
      {children}
      <View
        className={clsx(
          'absolute rounded-pill h-centi w-centi -top-1 -right-1 items-center justify-center',
          colorToneBg[color][tone]
        )}
        style={style}
      >
        {renderedValue}
      </View>
    </View>
  );
};

export default Badge;
