import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export type SnackbarContentProps = ViewProps;

const Content: React.FC<SnackbarContentProps> = ({
  className,
  children,
  ...rest
}) => (
  <View
    className={cn('flex-row items-center flex-1', className)}
    {...rest}
  >
    {children}
  </View>
);

Content.displayName = 'Snackbar.Content';

export default Content;
