import React from 'react';
import { Text } from '@tecsinapse/react-core';
import { ViewStyle, SwitchStyle } from './styled';
import { ClassNamesProps } from '@emotion/react';

export interface SwitchProps {
  labels?: { left?: string; right?: string };
  onChange: (active: boolean) => void;
  active: boolean;
  style?: ClassNamesProps;
}

const Switch = (props: SwitchProps): JSX.Element => {
  const { labels, onChange, active, style } = props;

  const handleChange = () => {
    onChange(!active);
  };
  return (
    <ViewStyle style={style}>
      {labels?.left && <Text>{labels.left}</Text>}
      <SwitchStyle
        trackColor="gray"
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
