import styled from '@emotion/styled';
import {
  RFValueStr,
  StyleProps,
  SWITCH_BODY_WIDTH,
  SWITCH_PIN_WIDTH,
} from '@tecsinapse/react-core';

export const StyledSwitchContent = styled.div<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  display: flex;
  padding: 0 ${({ theme }) => theme.spacing.micro};
  align-items: center;
  width: ${RFValueStr(SWITCH_BODY_WIDTH)};
  height: ${RFValueStr('22px')};
  &:hover {
    cursor: pointer;
  }
`;

export const StyledSwitch = styled.div<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: ${RFValueStr(SWITCH_PIN_WIDTH)};
  height: ${RFValueStr('16px')};
`;
