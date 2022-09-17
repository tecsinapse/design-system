import React, { FC } from 'react';
import { ButtonStateProps } from '../Button';
import { default as BaseState } from './BaseState';

const Error: FC<ButtonStateProps> = props => {
  return <BaseState {...props} icon="close-circle-outline" />;
};

export default Error;
