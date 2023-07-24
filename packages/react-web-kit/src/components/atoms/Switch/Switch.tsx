import React, { FC, useCallback, useRef } from 'react';
import {
  lightenDarkenColor,
  SwitchProps,
  useTheme,
} from '@tecsinapse/react-core';
import { Transition } from 'react-transition-group';
import { StyledSwitchContent, StyledSwitch } from './styled';

const Switch: FC<SwitchProps> = ({
  onChange,
  activeColor = 'primary',
  activeColorTone = 'medium',
  inactiveColor = 'secondary',
  inactiveColorTone = 'light',
  active,
  disabled = false,
  ...rest
}) => {
  const theme = useTheme();
  const transitionRef = useRef(null);
  const handleChange = useCallback(() => {
    if (!disabled) onChange(!active);
  }, [active, onChange]);

  const defaultStyleBackground = {
    transition: `all 300ms ease`,
  };

  const getBackgroundColor = (color: string) => {
    return disabled
      ? lightenDarkenColor(theme.color[inactiveColor][inactiveColorTone], 20)
      : color;
  };
  const transitionStylesBackground = {
    entering: {
      backgroundColor: getBackgroundColor(
        theme.color[inactiveColor][inactiveColorTone]
      ),
    },
    entered: {
      backgroundColor: getBackgroundColor(
        theme.color[activeColor][activeColorTone]
      ),
    },
    exiting: {
      backgroundColor: getBackgroundColor(
        theme.color[activeColor][activeColorTone]
      ),
    },
    exited: {
      backgroundColor: getBackgroundColor(
        theme.color[inactiveColor][inactiveColorTone]
      ),
    },
  };

  const defaultStyleCircle = {
    transition: `transform ${100}ms ease`,
  };

  const transitionStylesCircle = {
    entering: { transform: 'translateX(0%)' },
    entered: { transform: 'translateX(150%)' },
    exiting: { transform: 'translateX(150%)' },
    exited: { transform: 'translateX(0%)' },
  };

  return (
    <Transition in={active} timeout={100} nodeRef={transitionRef}>
      {state => (
        <div onClick={handleChange} ref={transitionRef}>
          <StyledSwitchContent
            {...rest}
            style={{
              ...defaultStyleBackground,
              ...transitionStylesBackground[state],
            }}
          >
            <StyledSwitch
              style={{
                ...defaultStyleCircle,
                ...transitionStylesCircle[state],
              }}
            />
          </StyledSwitchContent>
        </div>
      )}
    </Transition>
  );
};

export default Switch;
