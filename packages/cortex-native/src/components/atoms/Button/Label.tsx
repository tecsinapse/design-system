import React from 'react';

import Text, { TextProps } from '../Text/Text';
import { useButtonContext } from './ButtonContext';

export interface LabelProps extends TextProps {}

const Label = ({ children, style, ...rest }: LabelProps): React.ReactElement => {
  const { foregroundColor } = useButtonContext();
  return (
    <Text
      fontWeight="bold"
      typography="base"
      {...rest}
      style={[{ color: foregroundColor }, style]}
    >
      {children}
    </Text>
  );
};

Label.displayName = 'Button.Label';

export default Label;
