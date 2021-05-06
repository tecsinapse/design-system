import React, { FC } from 'react';
import { Text } from '@tecsinapse/react-core';
import { ViewStyle, SwitchStyle } from './styled';
import { StyleProp, ViewProps } from 'react-native';

export interface SwitchProps {
  labels?: { left?: string; right?: string };
  onChange: (active: boolean) => void;
  active: boolean;
  style?: StyleProp<ViewProps>;
}

const Switch: FC<SwitchProps> = ({
  labels,
  onChange,
  active,
  style,
}): JSX.Element => {
  const handleChange = () => {
    onChange(!active);
  };

  return (
    <ViewStyle style={style}>
      {labels?.left && <Text>{labels.left}</Text>}
      <SwitchStyle
        thumbColor={active ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={handleChange}
        value={active}
        accessibilityRole="switch"
      />
      {labels?.right && <Text>{labels.right}</Text>}
    </ViewStyle>
  );
};

export default Switch;
