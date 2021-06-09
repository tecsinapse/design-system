import styled, { css } from '@emotion/native';
import { StyleProps, SwitchProps } from '@tecsinapse/react-core';
import { PressableSurface } from '../PressableSurface';

const activeStyles = ({
  active,
  theme,
}: Partial<SwitchProps> & Partial<StyleProps>) =>
  active &&
  css`
    background-color: ${theme?.color.primary.medium};
    align-items: flex-end;
  `;

const inactiveStyles = ({
  active,
  theme,
}: Partial<SwitchProps> & Partial<StyleProps>) =>
  !active &&
  css`
    background-color: ${theme?.color.secondary.light};
    align-items: flex-start;
  `;

const StyledSwitchContentBase = styled(PressableSurface)<
  Partial<SwitchProps> & Partial<StyleProps>
>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  padding: 0 ${({ theme }) => theme.spacing.micro};
  justify-content: center;
  width: 40px;
  height: 22px;
`;

export const StyledSwitch = styled.View<Partial<StyleProps>>`
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  background-color: ${({ theme }) => theme.miscellaneous.surfaceColor};
  width: 16px;
  height: 16px;
`;

export const StyledSwitchContent = styled(StyledSwitchContentBase)(
  props => css`
    ${activeStyles(props)}
    ${inactiveStyles(props)}
  `
);
