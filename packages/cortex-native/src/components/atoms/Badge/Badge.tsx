import React, { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';
import { colorToneBg } from '../../../styles/colors';
import type { ColorGradationType, ColorType } from '../../../styles/types';
import Text from '../Text/Text';

export interface BadgeProps extends ViewProps {
  color?: ColorType;
  tone?: ColorGradationType;
  value: React.ReactNode;
  children?: ReactNode;
}

const Badge = ({
  children,
  style,
  color = 'primary',
  tone = 'medium',
  value,
  className,
  ...rest
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
        {...rest}
        className={cn(
          'absolute rounded-pill h-centi w-centi -top-1 -right-1 items-center justify-center',
          colorToneBg[color][tone],
          className,
        )}
        style={style}
      >
        {renderedValue}
      </View>
    </View>
  );
};

export default Badge;
