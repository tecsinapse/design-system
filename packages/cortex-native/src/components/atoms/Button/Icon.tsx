import React from 'react';

import { cn } from '@tecsinapse/cortex-core';
import BaseIcon, { IconProps as BaseIconProps } from '../Icon/Icon';
import { useButtonContext } from './ButtonContext';

export interface IconProps extends BaseIconProps {}

const Icon = ({ style, className, ...rest }: IconProps): React.ReactElement => {
  const { foregroundColor } = useButtonContext();
  return (
    <BaseIcon
      {...rest}
      style={[{ color: foregroundColor }, style]}
      className={cn('mr-mili', className)}
    />
  );
};

Icon.displayName = 'Button.Icon';

export default Icon;
