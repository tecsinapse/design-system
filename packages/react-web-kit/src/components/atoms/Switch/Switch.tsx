import React, { FC, useCallback } from 'react';
import {
  StyledSwitch2,
  StyledSwitchContent2,
} from '@tecsinapse/react-core/src/components/atoms/Switch/styled';
import { SwitchProps } from '@tecsinapse/react-core';

const Switch: FC<SwitchProps> = ({
  onChange,
  // activeColor = 'primary',
  // activeColorTone = 'medium',
  // inactiveColor = 'secondary',
  // inactiveColorTone = 'light',
  active,
  // dotStyle,
  // disabled = false,
  ...rest
}) => {
  const handleChange = useCallback(() => {
    onChange(!active);
  }, [active, onChange]);

  return (
    <div onClick={handleChange}>
      <StyledSwitchContent2 active={active}>
        <StyledSwitch2 />
      </StyledSwitchContent2>
    </div>
  );
};

export default Switch;
