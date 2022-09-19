import React from 'react';
import { SnackbarProps as SnackPropsCore } from '@tecsinapse/react-core';
import { Text, TextNativeProps } from '../../atoms/Text';
import { SnackbarStyled } from './styled';

export interface SnackbarNativeProps extends Omit<SnackPropsCore, 'children'> {
  value: string;
  textProps?: TextNativeProps;
}

const Snackbar: React.FC<SnackbarNativeProps> = ({
  value,
  textProps = { colorVariant: 'primary', colorTone: 'medium' },
  ...rest
}) => {
  return (
    <SnackbarStyled {...rest}>
      <Text {...textProps} fontWeight="bold" typography="base">
        {value}
      </Text>
    </SnackbarStyled>
  );
};

export default Snackbar;
