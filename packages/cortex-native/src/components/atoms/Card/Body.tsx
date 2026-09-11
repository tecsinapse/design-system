import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface BodyProps extends ViewProps {}

const Body = ({ children, className, ...rest }: BodyProps): React.ReactElement => (
  <View {...rest} className={cn('p-centi', className)}>
    {children}
  </View>
);

Body.displayName = 'Card.Body';

export default Body;
