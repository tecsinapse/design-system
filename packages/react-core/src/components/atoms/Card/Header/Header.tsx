import React, { FC } from 'react';
import { ClassNamesProps } from '@emotion/react';
import { View } from 'react-native';

export interface HeaderProps {
  children: JSX.Element;
  style?: ClassNamesProps;
}

const Header: FC<HeaderProps> = (props): JSX.Element => {
  const { children, style } = props;
  return <View style={style}>{children}</View>;
};

export default Header;
