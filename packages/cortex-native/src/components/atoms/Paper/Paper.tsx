import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface PaperProps extends ViewProps {
  /** Creates elevation shadow */
  elevated?: boolean;
}

const Paper = ({
  children,
  elevated = false,
  className,
  ...rest
}: PaperProps): React.ReactElement => (
  <View
    {...rest}
    className={cn(
      'bg-surface-overlay rounded-mili',
      elevated && 'shadow-default',
      className
    )}
  >
    {children}
  </View>
);

export default Paper;
