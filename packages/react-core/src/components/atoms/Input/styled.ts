import styled, { css } from '@emotion/native';
import { InputProps, StyleProps } from '@tecsinapse/react-core';
import { Platform, TextInput } from 'react-native';

const baseStyles = ({
  theme,
  color = 'primary',
}: StyleProps & InputProps) => css`
  background-color: ${theme.miscellaneous.surfaceColor};
  border-color: ${theme.color[color].medium};
  border-radius: ${theme.borderRadius.mili};
  border-width: ${theme.borderWidth.pico};
  padding: ${theme.spacing.mili};
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
