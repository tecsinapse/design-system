import styled, { css } from '@emotion/native';
import { StyleProps } from '../../../types/defaults';
import { PressableSurface } from '../PressableSurface';
import { ButtonProps } from './Button';

const textVariant = ({ variant }: StyleProps & ButtonProps) =>
  variant === 'text' &&
  css`
    background-color: transparent;
  `;

const outlineVariant = ({
  theme,
  color = 'primary',
  variant,
  tone = 'medium',
}: StyleProps & ButtonProps) =>
  variant === 'outlined' &&
  css`
    border-color: ${theme.color[color][tone]};
    border-width: ${theme.borderWidth.pico};
  `;

const filledVariant = ({
  theme,
  color = 'primary',
  variant,
  tone = 'medium',
}: StyleProps & ButtonProps) =>
  variant === 'filled' &&
  css`
    background-color: ${theme.color[color][tone]};
  `;

const frozenStyles = ({
  theme,
  color = 'primary',
  frozen,
}: StyleProps & ButtonProps) =>
  frozen &&
  css`
    background-color: ${theme.color[color].light};
  `;

const sizeStyles = ({ theme, size = 'default' }: StyleProps & ButtonProps) => {
  switch (size) {
    case 'small':
      return css`
        padding: ${theme.spacing.mili} ${theme.spacing.deca};
        min-height: 34px;
      `;
    default:
      return css`
        padding: ${theme.spacing.mili} ${theme.spacing.kilo};
        min-height: 44px;
      `;
  }
};

const StyledButtonBase = styled(PressableSurface)<
  ButtonProps & Partial<StyleProps>
>`
  border-radius: ${({ theme, borderRadius = 'mili' }) =>
    theme.borderRadius[borderRadius]};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(StyledButtonBase)<
  ButtonProps & Partial<StyleProps>
>(
  props => css`
    ${filledVariant(props)}
    ${outlineVariant(props)}
    ${textVariant(props)}
    ${frozenStyles(props)}
    ${sizeStyles(props)}
  `
);
