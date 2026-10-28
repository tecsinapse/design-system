import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface LeftProps extends ViewProps {}

const Left = ({
  children,
  className,
  ...rest
}: LeftProps): React.ReactElement => (
  <View {...rest} className={cn('mr-mili justify-center', className)}>
    {children}
  </View>
);

Left.displayName = 'Input.Left';

export default Left;
