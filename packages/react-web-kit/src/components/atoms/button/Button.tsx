import React from 'react';
import { Button as TSButton, ButtonProps, Text } from '@tecsinapse/react-core';

const Button = (props: ButtonProps): JSX.Element => {
  const { children, onClick } = props;
  return (
    <TSButton onClick={onClick}>
      <Text>{children}</Text>
    </TSButton>
  );
};

export default Button;
