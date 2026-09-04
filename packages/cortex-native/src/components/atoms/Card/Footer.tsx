import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

export interface FooterProps extends ViewProps {}

const Footer = ({ children, className, ...rest }: FooterProps): React.ReactElement => (
  <View {...rest} className={cn(className)}>{children}</View>
);

export default Footer;
