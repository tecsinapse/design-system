import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface FooterProps {
  style?: StyleProp<ViewStyle>;
}

const Footer: FC<FooterProps> = ({ children, style }): JSX.Element => (
  <View style={style}>{children}</View>
);

export default Footer;
