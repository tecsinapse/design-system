import { ButtonStateProps, Error as CoreError } from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../Text';

const Error: FC<ButtonStateProps> = props => {
  return <CoreError {...props} textComponent={Text} />;
};

export default Error;
