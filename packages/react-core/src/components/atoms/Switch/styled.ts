import styled from '@emotion/native';
import { Animated } from 'react-native';
import { StyleProps } from '../../../types/defaults';
import { RFValueStr } from '../../../utils';
import { SwitchProps } from './Switch';

export const StyledSwitchContent = styled(Animated.View)<
  Partial<SwitchProps> & Partial<StyleProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 0 ${({ theme }) => theme.spacing.micro};
  justify-content: center;
  width: ${RFValueStr('40px')};
  height: ${RFValueStr('22px')};
`;

export const StyledSwitch = styled(Animated.View)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: ${RFValueStr('16px')};
  height: ${RFValueStr('16px')};
`;
