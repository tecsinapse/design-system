import { useTheme } from '@emotion/react';
import React, { FC, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  ColorGradationType,
  ColorType,
  ThemeProp,
} from '../../../types/defaults';
import { StyledSwitch, StyledSwitchContent } from './styled';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  activeColor?: ColorType;
  activeColorTone?: ColorGradationType;
  inactiveColor?: ColorType;
  inactiveColorTone?: ColorGradationType;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

const Switch: FC<SwitchProps> = ({
  onChange,
  activeColor = 'primary',
  activeColorTone = 'medium',
  inactiveColor = 'secondary',
  inactiveColorTone = 'light',
  active,
  dotStyle,
  ...rest
}): JSX.Element => {
  const theme = useTheme() as ThemeProp;
  const color = active
    ? theme.color[activeColor][activeColorTone]
    : theme.color[inactiveColor][inactiveColorTone];

  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active]);

  return (
    <StyledSwitchContent
      {...rest}
      surfaceColor={color}
      active={active}
      onPress={handleChange}
    >
      <StyledSwitch style={dotStyle} />
    </StyledSwitchContent>
  );
};

export default Switch;
