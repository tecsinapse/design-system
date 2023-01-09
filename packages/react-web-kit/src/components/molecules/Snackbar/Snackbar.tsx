import React from 'react';
import {
  SnackbarProps as SnackPropsCore,
  Text,
  TextProps,
} from '@tecsinapse/react-core';
import { SnackbarStyled } from './styled';

export interface SnackbarWebProps extends Omit<SnackPropsCore, 'children'> {
  value: string;
  textProps?: TextProps;
}

const Snackbar: React.FC<SnackbarWebProps> = ({
  value,
  textProps = { colorVariant: 'primary', colorTone: 'medium' },
  ...rest
}) => {
  return (
    <SnackbarStyled {...rest} showProgressBar={false}>
      <Text {...textProps} fontWeight="bold" typography="base">
        {value}
      </Text>
    </SnackbarStyled>
  );
};

export default Snackbar;
