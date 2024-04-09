import styled from '@emotion/styled';
import { Icon, StyleProps } from '@tecsinapse/react-core';
import { default as styledNative } from '@emotion/native';

export const StyledContainer = styled('div')<Partial<StyleProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const StyledInputContainer = styled('div')<Partial<StyleProps>>`
  width: 100%;
`;

export const StyledHintContainer = styled('div')<Partial<StyleProps>>`
  align-self: start;
`;

export const StyledIconComponent = styledNative(Icon)<
  Partial<StyleProps & { disabled: boolean }>
>`
  margin-right: 12px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.secondary.light : 'inherit'};
`;
