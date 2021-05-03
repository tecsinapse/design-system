import React, { useState } from 'react';
import { Text } from '@tecsinapse/react-core';
import { ViewStyle, SwitchStyle } from './styled';

export interface SwitchProps {
  labels?: { left?: string; right?: string };
}
const Switch = (props: SwitchProps): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { labels } = props;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ViewStyle>
      {labels?.left && <Text>{labels.left}</Text>}
      <SwitchStyle
        trackColor="gray"
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        accessibilityRole="switch"
      />
      {labels?.right && <Text>{labels.right}</Text>}
    </ViewStyle>
  );
};

export default Switch;
