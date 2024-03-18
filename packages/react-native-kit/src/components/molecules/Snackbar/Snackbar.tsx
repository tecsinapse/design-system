import { SnackbarProps as SnackPropsCore } from '@tecsinapse/react-core';
import React from 'react';
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
      <Text fontWeight="bold" typography="base" {...textProps}>
        {value}
      </Text>
    </SnackbarStyled>
  );
};

export default Snackbar;
