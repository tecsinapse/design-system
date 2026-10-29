import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface HeaderProps extends ViewProps {}

const Header = ({ children, className, ...rest }: HeaderProps): React.ReactElement => (
  <View {...rest} className={cn(className)}>{children}</View>
);

export default Header;
