import React, { FC } from 'react';
import { ButtonStateProps } from '../Button';
import { default as BaseState } from './BaseState';

const Success: FC<ButtonStateProps> = props => {
  return <BaseState {...props} icon="checkmark-circle-outline" />;
};

export default Success;
