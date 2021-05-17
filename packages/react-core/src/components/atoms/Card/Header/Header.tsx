import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = ({ children, style }): JSX.Element => (
  <View style={style}>{children}</View>
);

export default Header;
