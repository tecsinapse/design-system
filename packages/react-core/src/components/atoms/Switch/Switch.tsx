import React, { FC, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledSwitch, StyledSwitchContent } from './styled';

export interface SwitchProps {
  onChange: (active: boolean) => void;
  active: boolean;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

const Switch: FC<SwitchProps> = ({
  onChange,
  active,
  dotStyle,
  ...rest
}): JSX.Element => {
  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active]);

  return (
    <StyledSwitchContent {...rest} active={active} onPress={handleChange}>
      <StyledSwitch style={dotStyle} />
    </StyledSwitchContent>
  );
};

export default Switch;
