import styled, { css } from '@emotion/native';
import { TextInput, Platform } from 'react-native';
import { InputProps, StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme, color = 'primary' }) => css`
  padding: ${theme.spacing.mili};
  border-color: ${theme.color[color].medium};
  border-radius: ${theme.borderRadius.micro};
  border-width: ${theme.borderWidth.pico};
`;

const focusedStyles = ({
  focused,
  theme,
  color = 'primary',
}: InputProps & StyleProps) =>
  focused &&
  css`
    ${baseStyles({ theme, color })}
    border-width: ${theme.borderWidth.nano};
  `;

const webStyles = ({ theme, color = 'primary' }: StyleProps & InputProps) =>
  Platform.OS === 'web' &&
  css`
    ${baseStyles({ theme, color })}
    &:focus {
      outline-width: ${theme?.borderWidth.nano};
      outline-color: ${theme.color[color].medium};
    }
  `;

export const StyledInput = styled(TextInput)<InputProps & Partial<StyleProps>>(
  baseStyles,
  focusedStyles,
  webStyles
);
