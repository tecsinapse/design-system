import {
  ButtonStateProps,
  Success as CoreSuccess,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../Text';

const Success: FC<ButtonStateProps> = props => {
  return <CoreSuccess {...props} textComponent={Text} />;
};

export default Success;
