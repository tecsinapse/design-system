import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface HeaderProps {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { children, style } = props;
  return <View style={style}>{children}</View>;
};

export default Header;
