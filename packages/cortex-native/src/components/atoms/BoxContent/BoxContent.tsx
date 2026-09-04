import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';

export interface BoxContentProps extends ViewProps {
  variant: 'top' | 'bottom' | 'left' | 'right';
}

const variantClass: Record<BoxContentProps['variant'], string> = {
  top: 'rounded-b-deca',
  bottom: 'rounded-t-deca',
  left: 'rounded-r-deca',
  right: 'rounded-l-deca',
};

const BoxContent: FC<BoxContentProps> = ({
  children,
  variant,
  style,
  testID,
  ...rest
}) => (
  <View
    className={clsx(
      'bg-surface-overlay min-h-kilo overflow-hidden shadow-default',
      variantClass[variant],
    )}
    style={style}
    testID={testID}
    {...rest}
  >
    {children}
  </View>
);

export default BoxContent;
