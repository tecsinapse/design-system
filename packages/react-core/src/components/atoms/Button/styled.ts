import styled, { css } from '@emotion/native';
import { TouchableHighlight } from 'react-native';
import { ButtonProps } from './Button';
import { StyleProps } from '../../../types/defaults';

const baseStyles = ({ theme }: StyleProps) => css`
  padding: ${theme.spacing.mili};
  border-radius: ${theme.borderRadius.micro};
`;

const textVariant = ({ variant, theme }: StyleProps & ButtonProps) =>
  variant === 'text' &&
  css`
    background-color: unset;
    ${baseStyles({ theme })}
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
    ${baseStyles({ theme })}
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
    ${baseStyles({ theme })}
  `;

export const StyledButton = styled(TouchableHighlight)<
  ButtonProps & Partial<StyleProps>
>(filledVariant, outlineVariant, textVariant);
