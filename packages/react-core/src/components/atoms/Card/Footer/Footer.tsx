import React, { FC } from 'react';
import { ClassNamesProps } from '@emotion/react';
import { View } from 'react-native';

export interface FooterProps {
  children: JSX.Element;
  style?: ClassNamesProps;
}

const Footer: FC<FooterProps> = (props): JSX.Element => {
  const { children, style } = props;
  return <View style={style}>{children}</View>;
};

export default Footer;
