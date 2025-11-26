import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const Header = ({ children, style }: HeaderProps): React.ReactElement => (
  <View style={style}>{children}</View>
);

export default Header;
