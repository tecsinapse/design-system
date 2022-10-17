import { default as styledWeb } from '@emotion/styled/dist/emotion-styled.cjs';
import { RFValueStr, StyleProps } from '@tecsinapse/react-core';
import {
  SWITCH_BODY_WIDTH,
  SWITCH_PIN_WIDTH,
} from '@tecsinapse/react-core/src/components/atoms/Switch/styled';

export const StyledSwitchContent = styledWeb.div<
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

export const StyledSwitch = styledWeb.div<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: ${RFValueStr(SWITCH_PIN_WIDTH)};
  height: ${RFValueStr('16px')};
`;
