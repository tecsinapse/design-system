import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface DividerProps extends ViewProps {
  linePosition?: 'top' | 'bottom';
  noLine?: boolean;
}

const Divider: FC<DividerProps> = ({
  children,
  linePosition = 'top',
  noLine = false,
  style,
  testID,
  className,
  ...rest
}) => {
  const dividerClassName = cn(
    'border-secondary-xlight',
    !noLine && linePosition === 'top' && 'border-t',
    !noLine && linePosition === 'bottom' && 'border-b',
    className,
  );
  return (
    <View className={dividerClassName} style={style} testID={testID} {...rest}>
      {children}
    </View>
  );
};

export default Divider;
