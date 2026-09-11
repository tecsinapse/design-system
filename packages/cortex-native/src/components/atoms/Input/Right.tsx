import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface RightProps extends ViewProps {}

const Right = ({
  children,
  className,
  ...rest
}: RightProps): React.ReactElement => (
  <View {...rest} className={cn('ml-mili justify-center', className)}>
    {children}
  </View>
);

Right.displayName = 'Input.Right';

export default Right;
