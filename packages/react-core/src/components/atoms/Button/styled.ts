import styled, { css } from '@emotion/native';
import { TouchableHighlight } from 'react-native';
import { ButtonProps } from './Button';
import { StyleProps } from '../../../types/defaults';

const baseStyles = ({ theme }: StyleProps & ButtonProps) => css`
  padding: ${theme.spacings.mili};
  border-radius: ${theme.borderRadius.micro};
`;

const textVariant = ({ variant }: StyleProps & ButtonProps) =>
  variant === 'text' &&
  css`
    background-color: unset;
  `;

const outlineVariant = ({
  theme,
  color = 'primary',
  variant = 'outlined',
  tone = 'medium',
}: StyleProps & ButtonProps) =>
  variant === 'outlined' &&
  css`
    border-color: ${theme.colors[color][tone]};
    border-width: ${theme.borderWidth.nano};
  `;

export const StyledButton = styled(TouchableHighlight)<
  ButtonProps & Partial<StyleProps>
>(baseStyles, textVariant, outlineVariant);
