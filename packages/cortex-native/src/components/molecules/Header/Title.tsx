import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface TitleProps extends ViewProps {}

const Title = ({ children, className, ...rest }: TitleProps): React.ReactElement => (
  <View {...rest} className={cn('flex-1 items-center justify-center', className)}>
    {children}
  </View>
);

Title.displayName = 'Header.Title';

export default Title;
