import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';

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
  ...rest
}) => {
  const className = clsx(
    'border-secondary-xlight',
    !noLine && linePosition === 'top' && 'border-t',
    !noLine && linePosition === 'bottom' && 'border-b',
  );
  return (
    <View className={className} style={style} testID={testID} {...rest}>
      {children}
    </View>
  );
};

export default Divider;
