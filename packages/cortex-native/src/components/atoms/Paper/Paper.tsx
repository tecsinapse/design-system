import React from 'react';
import { View, ViewProps } from 'react-native';
import { clsx } from 'clsx';

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
    className={clsx(
      'bg-surface-overlay rounded-mili',
      elevated && 'shadow-default',
      className
    )}
  >
    {children}
  </View>
);

export default Paper;
