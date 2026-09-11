import React from 'react';
import { cn } from '@tecsinapse/cortex-core';

import Text, { TextProps } from '../Text/Text';
import { useInputContext } from './InputContext';

export interface LabelProps extends TextProps {}

const Label = ({
  children,
  className,
  ...rest
}: LabelProps): React.ReactElement => {
  const { disabled } = useInputContext();
  return (
    <Text
      fontColor="medium"
      typography="label"
      fontWeight="bold"
      {...rest}
      className={cn(disabled && 'opacity-50', className)}
    >
      {children}
    </Text>
  );
};

Label.displayName = 'Input.Label';

export default Label;
