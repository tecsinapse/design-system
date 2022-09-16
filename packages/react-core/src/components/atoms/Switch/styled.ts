import styled from '@emotion/native';
import { default as styledWeb } from '@emotion/styled';
import { Animated } from 'react-native';
import { StyleProps } from '@tecsinapse/react-core';
import { RFValueStr } from '../../../utils';

export const SWITCH_BODY_WIDTH = '40px';
export const SWITCH_PIN_WIDTH = '16px';

export const StyledSwitchContent = styled(Animated.View)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 0 ${({ theme }) => theme.spacing.micro};
  justify-content: center;
  width: ${RFValueStr(SWITCH_BODY_WIDTH)};
  height: ${RFValueStr('22px')};
`;

export const StyledSwitch = styled(Animated.View)<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: ${RFValueStr(SWITCH_PIN_WIDTH)};
  height: ${RFValueStr('16px')};
`;

export const StyledSwitchContent2 = styledWeb.div<
  Partial<StyleProps> & { active: boolean }
>`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 0 ${({ theme }) => theme.spacing.micro};
  align-items: center;
  justify-content: ${props =>
    props.active === true ? 'flex-end' : 'flex-start'};
  width: ${RFValueStr(SWITCH_BODY_WIDTH)};
  height: ${RFValueStr('22px')};
  background-color: ${({ theme, active }) =>
    active ? theme.color.primary.medium : theme.color.secondary.light}; 

`;

export const StyledSwitch2 = styledWeb.div<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: ${RFValueStr(SWITCH_PIN_WIDTH)};
  height: ${RFValueStr('16px')};
`;
