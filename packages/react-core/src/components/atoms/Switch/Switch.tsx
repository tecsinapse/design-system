import React, { FC } from 'react';
import { Text } from '@tecsinapse/react-core';
import { ViewStyle, SwitchStyle } from './styled';
import { StyleProp, ViewProps } from 'react-native';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  style?: StyleProp<ViewProps>;
}

const Switch: FC<SwitchProps> = ({ onChange, active, style }): JSX.Element => {
  const handleChange = () => {
    onChange(!active);
  };

  return (
    <ViewStyle style={style}>
      <SwitchStyle
        onValueChange={handleChange}
        value={active}
        accessibilityRole="switch"
      />
    </ViewStyle>
  );
};

export default Switch;
