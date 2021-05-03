import React, { useState } from 'react';
import { Text } from '@tecsinapse/react-core';
import { ViewStyle, SwitchStyle } from './styled';

export interface SwitchProps {
  labels?: { left?: string; right?: string };
  onChange: (active: boolean) => void;
  active: boolean;
}

const Switch = (props: SwitchProps): JSX.Element => {
  const { labels, onChange, active } = props;

  const handleChange = () => {
    onChange(!active);
  };
  return (
    <ViewStyle>
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
