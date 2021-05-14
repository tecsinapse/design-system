import styled, { css } from '@emotion/native';
import { TextInput, Platform } from 'react-native';
import { InputProps, StyleProps } from '@tecsinapse/react-core';

const baseStyles = ({ theme }) => css`
  padding: 10px;
  border-color: ${theme.color.primary.medium};
  border-radius: 4px;
  border-width: 1px;
`;

const focusedStyles = ({ focused, theme }: InputProps & Partial<StyleProps>) =>
  focused &&
  css`
    ${baseStyles({ theme })}
    border-width: 2px;
  `;

const webStyles = ({ theme }: StyleProps) =>
  Platform.OS === 'web' &&
  css`
    ${baseStyles({ theme })}
    &:focus {
      outline-width: 2px;
      outline-color: ${theme.color.primary.medium};
    }
  `;

export const StyledInput = styled(TextInput)<InputProps & Partial<StyleProps>>(
  focusedStyles,
  webStyles
);
