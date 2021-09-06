import styled from '@emotion/native';
import { StyleProps, SwitchProps } from '@tecsinapse/react-core';
import { Animated } from 'react-native';

export const StyledSwitchContent = styled(Animated.View)<
  Partial<SwitchProps> & Partial<StyleProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 0 ${({ theme }) => theme.spacing.micro};
  justify-content: center;
  width: 40px;
  height: 22px;
`;

export const StyledSwitch = styled(Animated.View)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: 16px;
  height: 16px;
`;
