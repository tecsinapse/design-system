import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@tecsinapse/cortex-core';

import Badge from '../../atoms/Badge/Badge';
import { FloatingButton, type Attachable } from './FloatingButton';

export interface HeaderSlotProps extends ViewProps {
  /** Legacy Attachable shorthand. Ignored when children are provided. */
  button?: Attachable;
}

const Left = ({ button, children, className, ...rest }: HeaderSlotProps): React.ReactElement => (
  <View {...rest} className={cn('justify-center', className)}>
    {children ??
      (button ? (
        button.valueBadge ? (
          <Badge value={button.valueBadge} color="error">
            <FloatingButton {...button} />
          </Badge>
        ) : (
          <FloatingButton {...button} />
        )
      ) : null)}
  </View>
);

Left.displayName = 'Header.Left';

export default Left;
