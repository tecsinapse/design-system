import React, { FC } from 'react';
import { ViewStyle, SwitchStyle } from './styled';
import { StyleProp, ViewStyle as ViewStyleRN } from 'react-native';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  style?: StyleProp<ViewStyleRN>;
}

const Switch: FC<SwitchProps> = ({ onChange, active, style, children }): JSX.Element => {
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
      { children }
    </ViewStyle>
  );
};

export default Switch;
