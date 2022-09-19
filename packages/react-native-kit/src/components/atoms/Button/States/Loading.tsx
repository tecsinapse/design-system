import {
  ButtonStateProps,
  Loading as CoreLoading,
} from '@tecsinapse/react-core';
import React, { FC } from 'react';
import { Text } from '../../Text';

const Loading: FC<ButtonStateProps> = props => {
  return <CoreLoading {...props} textComponent={Text} />;
};

export default Loading;
