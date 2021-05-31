import styled, { css } from '@emotion/native';
import { TouchableHighlight } from 'react-native';
import { StyleProps } from '../../../types/defaults';
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

const StyledButtonBase = styled(TouchableHighlight)<
  ButtonProps & Partial<StyleProps>
>`
  padding: ${({ theme }) => theme.spacing.mili};
  border-radius: ${({ theme, borderRadius = 'mili' }) =>
    theme.borderRadius[borderRadius]};
  align-items: center;
`;

export const StyledButton = styled(StyledButtonBase)<
  ButtonProps & Partial<StyleProps>
>(
  props => css`
    ${filledVariant(props)}
    ${outlineVariant(props)}
  ${textVariant(props)}
  `
);
