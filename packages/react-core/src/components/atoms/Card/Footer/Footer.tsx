import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface FooterProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const Footer = ({ children, style }: FooterProps): JSX.Element => (
  <View style={style}>{children}</View>
);

export default Footer;
