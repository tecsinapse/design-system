import React from 'react';

import BaseIcon, { IconProps as BaseIconProps } from '../Icon/Icon';
import { useButtonContext } from './ButtonContext';

export interface IconProps extends BaseIconProps {}

const Icon = ({ style, ...rest }: IconProps): React.ReactElement => {
  const { foregroundColor } = useButtonContext();
  return <BaseIcon {...rest} style={[{ color: foregroundColor }, style]} />;
};

Icon.displayName = 'Button.Icon';

export default Icon;
