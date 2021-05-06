import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface FooterProps {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const Footer: FC<FooterProps> = (props): JSX.Element => {
  const { children, style } = props;
  return <View style={style}>{children}</View>;
};

export default Footer;
