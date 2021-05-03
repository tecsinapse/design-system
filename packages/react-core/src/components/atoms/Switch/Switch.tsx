import React, { useState } from 'react';
import { View, Switch as SwitchRN } from 'react-native';
import { Text } from '@tecsinapse/react-core';
import styled from '@emotion/native';

export interface SwitchProps {
  labels?: { left?: string; right?: string };
}
export const Switch = (props: SwitchProps): JSX.Element => {
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

const ViewStyle = styled(View)`
  flex-direction: row;
`;

const SwitchStyle = styled(SwitchRN)`
  margin: 0px 10px 0px 10px;
`;
